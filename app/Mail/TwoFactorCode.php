<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TwoFactorCode extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $code;

    /**
     * Create a new message instance.
     */
    public function __construct($user, string $code)
    {
        $this->user = $user;
        $this->code = $code;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Your two-factor authentication code')
                    ->view('emails.two-factor-code')
                    ->with(['code' => $this->code, 'name' => $this->user->name ?? $this->user->email]);
    }
}
