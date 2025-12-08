from enum import Enum
from optparse import TitledHelpFormatter
from types import ClassMethodDescriptorType
from typing import Annotated, List, Optional

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field, HttpUrl

# VERY USEFUL REMEBER TO USE IT LIKE THIS IN THE FUTURE TOO
# Helper for ObjectId -> str
PyObjectId = Annotated[str, BeforeValidator(str)]


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


# Forget Password Model


class ForgetPasswordRequest(BaseModel):
    email: EmailStr


# Reset Password Model


class ResetPasswordRequest(BaseModel):
    password: str


class ResetPasswordResponse(BaseModel):
    message: str


# Project Model


# Define the choices
class CourseLevel(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"


# /projects POST
class ProjectMetadataRequest(BaseModel):
    title: str
    description: str
    category: str
    tech_stack: List[str]  # Handles ["React", "Node"]
    level: CourseLevel  # Handles the specific choices
    price: float
    github_link: Optional[HttpUrl] = None
    demo_link: Optional[HttpUrl] = None


class ProjectInDB(ProjectMetadataRequest):
    owner_id: str
    owner_username: str
    rating: float


# /projects GET
class ProjectResponse(BaseModel):
    id: str
    title: str
    price: float
    rating: float
    demo_link: HttpUrl


# projects/id GET


class ProjectDetailResponse(BaseModel):
    # Map _id to id
    id: PyObjectId = Field(alias="_id")

    title: str
    description: str
    price: float
    demo_link: Optional[str] = None
    owner_id: str
    owner_username: str
    reviews: list = []
