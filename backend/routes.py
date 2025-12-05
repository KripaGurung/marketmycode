from typing import Annotated

import jwt
from auth import (
    ALGORITHM,
    SECRET_KEY,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    hash_password,
    oauth2_scheme,
)
from db import users_collection
from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models import RefreshRequest, Token, UserInDB, signupRequest
from models import User as UserModel

auth_router = APIRouter(prefix="/auth")


@auth_router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await authenticate_user(
        users_collection, form_data.username, form_data.password
    )

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token({"sub": user["username"]})
    refresh_token = create_refresh_token({"sub": user["username"]})
    user_id = str(user["id"])

    return {
        "success": True,
        "data": {
            "user_id": user_id,
            "token": access_token,
            "refresh_token": refresh_token,
        },
    }


@auth_router.post("/signup")
async def signup(data: signupRequest):
    if user := await users_collection.find_one({"username": data.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = hash_password(data.password)
    user = UserInDB(
        username=data.username,
        fullname=data.fullname,
        email=data.email,
        hashed_password=hashed_password,
    )
    result = await users_collection.insert_one(user.model_dump())
    user_id = str(result.inserted_id)
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})

    return {
        "success": True,
        "data": {
            "user_id": user_id,
            "token": access_token,
            "refresh_token": refresh_token,
        },
    }


@auth_router.post("/refresh")
async def refresh(refresh_token: RefreshRequest):
    try:
        payload = decode_token(refresh_token.refresh_token)
        username = payload.get("sub")
        print("USERNAME", username)
        print("TOKEN", username)
        if username is None:
            raise HTTPException(status_code=400, detail="Invalid token")

        access_token = create_access_token(data={"sub": username})
        return {
            "success": True,
            "data": {
                "access_token": access_token,
            },
        }
    except jwt.PyJWTError:
        raise HTTPException(status_code=400, detail="Invalid token")


@auth_router.post("/logout")
def logout():
    pass


@auth_router.get("/test/me")
def test(current_user: Annotated[UserModel, Depends(oauth2_scheme)]):
    user = get_current_user(token=current_user)
    return user
