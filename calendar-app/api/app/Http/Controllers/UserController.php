<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Jobs\PasswordResetJob;
use App\Jobs\VerifyUserJobs;
use App\Models\User;
use App\Traits\ApiResponseWithHttpSTatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    use ApiResponseWithHttpSTatus;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */

    public function forgotPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $token = Str::random(15);
            $details = ['name' => $user->name, 'token' => $token, 'email' => $user->email, 'hashEmail' => Crypt::encryptString($user->email)];
            if (dispatch(new PasswordResetJob($details))) {
                DB::table('password_resets')->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => now()
                ]);
                return $this->apiResponse('Password reset link has been sent to your email address', null, Response::HTTP_OK, true);
            }
        } else {
            return $this->apiResponse('invalid email', null, Response::HTTP_OK, true);
        }
    }


    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|string|min:6',
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $email = Crypt::decryptString($request->email);
        $user = DB::table('password_resets')->where([['email', $email], ['token', $request->token]])->first();
        if (!$user) {
            return $this->apiResponse('Invalid email address or token', null, Response::HTTP_OK, true);
        } else {
            $data = User::where('email', $email)->first();
            $data->update([
                'password' => Hash::make($request->password)
            ]);
            DB::table('password_resets')->where('email', $email)->delete();
            return $this->apiResponse('Password updated !', null, Response::HTTP_OK, true);
        }
    }
}
