from quopri import decode

from auth import create_access_token, decode_access_token, hash_password

password = hash_password("password")
print(password)
# print(create_access_token({"sub": password}))
# print(
# decode_access_token(
#     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImV4cCI6MTc2NDczOTU1M30.Xbp0uFWsI_jsjYuKMxfevYuCWgBZp_xmvaK30O41AJE"
# )
# )
