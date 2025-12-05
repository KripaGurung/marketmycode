from socket import has_ipv6
from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from models import Token, TokenData, UserInDB
from pwdlib import PasswordHash

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError
from test_db import User

SECRET_KEY = "8ec7d5f922b1a18d87a04077aa4c61abf184733415c91eed00ff43116806953d"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


password_hash = PasswordHash.recommended()


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except InvalidTokenError:
        raise InvalidTokenError
    return


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def hash_password(password):
    return password_hash.hash(password)


async def authenticate_user(users_collection, username: str, password: str):
    user = await users_collection.find_one({"username": username})
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False

    # MongoDB returns "_id", but Pydantic expects "id"
    user["id"] = str(user["_id"])
    del user["_id"]
    print(user)
    return user


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
):
    try:
        payload = decode_token(token)
        username = payload.get("sub")
        if username is None:
            raise InvalidTokenError

        for user_dict in User.values():
            if user_dict["username"] == username:
                return UserInDB(**user_dict)

    except InvalidTokenError:
        raise InvalidTokenError
    return
