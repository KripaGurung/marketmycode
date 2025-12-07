import os

import resend

resend.api_key = "api_key "

params = {
    "from": "onboarding@resend.dev",
    "to": ["np03cs4a220493@heraldcollege.edu.np"],
    'template': {
        'id': "untitled-template",
        "variables": {
            "url": f"https://example.com/{}",
            "user": f"{user}"
        }
    }
}

email = resend.Emails.send(params)
print(email)
