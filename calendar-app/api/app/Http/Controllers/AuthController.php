<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        $fields = $request->validate([
            "name" => "required|string",
            "email" => "required|string|unique:users,email",
            "password" => "required|string|confirmed"
        ]);

        $user = User::create([
            "name" => $fields["name"],
            "email" => $fields["email"],
            "password" => bcrypt($fields["password"])
        ]);

        $token = $user->createToken("authToken")->plainTextToken;

        // Send welcome email
        Mail::to($user->email)->send(new WelcomeEmail($user));

        $response = [
            "user" => $user,
            "token" => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response([
            "message" => "Logged out",
            "status" => "success"
        ], 200);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            "email" => "required|string",
            "password" => "required|string"
        ]);

        // Check email
        $user = User::where("email", $fields["email"])->first();

        // Check password
        if (!$user || !Hash::check($fields["password"], $user->password)) {
            return response([
                "message" => "Bad credentials"
            ], 401);
        }

        $token = $user->createToken("authToken")->plainTextToken;

        $response = [
            "user" => $user,
            "token" => $token
        ];

        return response($response, 201);
    }
}
