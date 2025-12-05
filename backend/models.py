from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class RefreshRequest(BaseModel):
    refresh_token: str


class User(BaseModel):
    username: str
    email: str
    fullname: str


class UserInDB(User):
    hashed_password: str


class signupRequest(BaseModel):
    username: str
    email: EmailStr
    fullname: str
    password: str


class signupResponse(BaseModel):
    id: str
    access_token: str
    refresh_token: str
