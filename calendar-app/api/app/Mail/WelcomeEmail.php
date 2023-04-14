<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class WelcomeEmail extends Mailable
{
  use Queueable, SerializesModels;

  protected $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function build()
  {
    return $this->view('email.welcome')
      ->subject('Welcome to My Application')
      ->with([
        'name' => $this->user->name,
      ]);
  }
}
