<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailOtpNotification extends Notification
{
    use Queueable;

    public function __construct(protected string $code)
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your login code')
            ->line('Your login code is: '. $this->code)
            ->line('This code will expire in 10 minutes.')
            ->line('If you did not request this code, please ignore this email.');
    }
}
