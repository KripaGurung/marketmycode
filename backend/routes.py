from typing import Annotated

import jwt
from auth import (
    ALGORITHM,
    SECRET_KEY,
    authenticate_user,
    create_access_token,
    get_current_user,
    oauth2_scheme,
)
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models import Token
from models import User as UserModel
from test_db import User

auth_router = APIRouter(prefix="/auth")


@auth_router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(User, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {
        "success": True,
        "data": {
            "user_id": user.id,
            "token": access_token,
            "refresh_token": "refresh_token",
        },
    }


@auth_router.post("/signup")
def signup():
    pass


@auth_router.post("/refresh")
def refresh():
    pass


@auth_router.post("/logout")
def logout():
    pass


@auth_router.get("/test/me")
def test(current_user: Annotated[UserModel, Depends(oauth2_scheme)]):
    user = get_current_user(token=current_user)
    return user
