<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginOtpNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly string $otp
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verification Login OTP Code')
            ->line("**{$this->otp}**")
            ->line('This code expires in 10 minutes.');
    }
}
