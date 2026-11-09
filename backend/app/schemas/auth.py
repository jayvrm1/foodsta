from typing import Optional
from pydantic import BaseModel, EmailStr
from backend.app.models.user import UserRole


class UserRegister(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    password: str
    role: UserRole = UserRole.ENTHUSIAST
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    # Chef specific optional registration fields
    title: Optional[str] = None
    restaurant: Optional[str] = None
    restaurant_location: Optional[str] = None
    experience_years: Optional[int] = 0


class UserLogin(BaseModel):
    username_or_email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    username: str
    full_name: str
    role: str
    avatar_url: Optional[str] = None
    is_verified: bool = False
    is_master_chef: bool = False

