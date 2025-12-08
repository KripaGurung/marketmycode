from typing import Annotated, List

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
from bson import ObjectId
from db import projects_collection, users_collection
from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models import (
    ForgetPasswordRequest,
    ProjectDetailResponse,
    ProjectInDB,
    ProjectMetadataRequest,
    ProjectResponse,
    RefreshRequest,
    ResetPasswordRequest,
    ResetPasswordResponse,
    Token,
    UserInDB,
    signupRequest,
)
from models import User as UserModel
from sendMail import sendMail

auth_router = APIRouter(prefix="/auth")
router = APIRouter()


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


# Forget Password Route
@auth_router.post("/forget-password")
async def forget_password(request: ForgetPasswordRequest):
    user = await users_collection.find_one({"email": request.email})
    if user is None:
        raise HTTPException(status_code=404, detail="User not Found!")
    else:
        token = create_access_token(data={"sub": user["email"]})
        sendMail(user["email"], token)
        return {"success": True, "message": "Password reset email sent!"}


# Reset Password Route
@auth_router.post("/reset-password")
async def reset_password(token: str, request: ResetPasswordRequest):
    try:
        payload = decode_token(token)
        email = payload.get("sub")
        user = await users_collection.find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=404, detail="User not Found!")
        hashed_password = hash_password(request.password)
        await users_collection.update_one(
            {"email": email}, {"$set": {"password": hashed_password}}
        )
        return {"success": True, "message": "Password reset successfully!"}
    except jwt.PyJWTError:
        raise HTTPException(status_code=400, detail="Invalid token")


# Create Project Route
@router.post("/projects")
async def create_project(
    request: ProjectMetadataRequest, current_user: UserInDB = Depends(get_current_user)
):
    new_project = ProjectInDB(
        **request.dict(),
        owner_id=current_user["id"],
        owner_username=current_user["username"],
        rating=0.0,
    )
    await projects_collection.insert_one(new_project.model_dump(mode="json"))
    return {"success": True, "message": "Project created successfully!"}


# Get Projects Route


@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects():
    # (returns a list of dictionaries with '_id')
    raw_projects = await projects_collection.find().to_list(100)

    cleaned_projects = []
    for doc in raw_projects:
        # Fix: Convert ObjectId to string and map '_id' -> 'id'
        doc["id"] = str(doc.pop("_id"))
        cleaned_projects.append(ProjectResponse(**doc))

    return cleaned_projects


# Get a specific project
@router.get("/projects/{project_id}", response_model=ProjectDetailResponse)
async def get_project_detail(project_id: str):
    project = await projects_collection.find_one({"_id": ObjectId(project_id)})

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # 2. Return directly!
    # Pydantic automatically maps '_id' -> 'id' and 'owner_id' -> 'owner_id'
    return project
