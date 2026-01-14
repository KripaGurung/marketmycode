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
    phone: str
    country: str
    preference: List[str]
    level: UserLevel


class UserInDB(User):
    hashed_password: str


class UserLevel(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    PROFESSIONAL = "Professional"


# Signup Request Model
class signupRequest(BaseModel):
    username: str
    email: EmailStr
    fullname: str
    password: str
    phone: str
    country: str
    preference: List[str]
    level: UserLevel 


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
    category: str  # <--- ADDED
    tech_stack: List[str]  # <--- ADDED
    level: CourseLevel  # <--- ADDED
    price: float
    demo_link: Optional[HttpUrl] = None
    github_link: Optional[HttpUrl] = None
    owner_id: str
    owner_username: str
    rating: float  # <--- ADDED
    reviews: list = []

    # Add Config for Pydantic to allow the alias
    model_config = ConfigDict(populate_by_name=True)


# projects/id PATCH
class ProjectUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    demo_link: Optional[HttpUrl] = None
    github_link: Optional[HttpUrl] = None
    category: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    level: Optional[CourseLevel] = None
