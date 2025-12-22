import os

import dotenv
import resend

dotenv.load_dotenv()

resend.api_key = os.environ.get("RESEND_MAIL_API")
base_url = "http://localhost:8000/auth"


def sendMail(user, token):
    params = {
        "from": "onboarding@resend.dev",
        "to": [user],
        "template": {
            "id": "marketmycode",
            "variables": {
                "user": f"{user}",
                "url": f"{base_url}/reset-password/?token={token}",
            },
        },
    }
    resend.Emails.send(params)
