<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class LoginOtpNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly string $otp
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your login verification code')
            ->line('Use this code to complete your login:')
            ->line("**{$this->otp}**")
            ->line('This code expires in 10 minutes.');
    }
}