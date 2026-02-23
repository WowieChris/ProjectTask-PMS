<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name') }} — Two-Factor Code</title>
    <style>
        body { background-color: #f4f6f8; margin: 0; padding: 0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        .container { max-width: 600px; margin: 24px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(15,23,42,0.06); }
        .header { background: linear-gradient(90deg,#0ea5a7,#3b82f6); color: #fff; padding: 20px; text-align: left; }
        .brand { font-size: 18px; font-weight: 700; }
        .content { padding: 28px; color: #0f172a; }
        .greeting { margin: 0 0 12px 0; font-size: 16px; }
        .lead { margin: 0 0 18px 0; color: #475569; }
        .code { display: inline-block; background: #0f172a; color: #fff; padding: 14px 22px; border-radius: 8px; font-size: 28px; letter-spacing: 4px; font-weight: 700; font-family: 'Courier New', Courier, monospace; }
        .cta { margin: 22px 0; }
        .button { display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; }
        .muted { color: #94a3b8; font-size: 13px; }
        .footer { padding: 18px 28px; background: #fbfdff; color: #64748b; font-size: 13px; }
        @media (max-width: 420px) { .code { font-size: 22px; padding: 12px 16px; } }
    </style>
</head>
<body>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <div class="container">
                    <div class="header">
                        <div class="brand">{{ config('app.name') }}</div>
                    </div>
                    <div class="content">
                        <p class="greeting">Hello {{ $name }},</p>
                        <p class="lead">We received a request to sign in to your account. Use the code below to complete signing in.</p>

                        <p><span class="code">{{ $code }}</span></p>

                        <div class="cta">
                            <a class="button" href="{{ url('/two-factor') }}">Verify now</a>
                        </div>

                        <p class="muted">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email or secure your account.</p>
                    </div>
                    <div class="footer">
                        <div>{{ config('app.name') }} — Security Team</div>
                        <div style="margin-top:6px;">Need help? Reply to this email or visit our support page.</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
