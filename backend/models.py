from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class RefreshRequest(BaseModel):
    refresh_token: str


class User(BaseModel):
    id: str
    username: str
    email: str
    fullname: str


class UserInDB(User):
    hashed_password: str
