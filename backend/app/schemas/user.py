from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict
from backend.app.models.user import UserRole


class ChefProfileResponse(BaseModel):
    id: str
    title: str
    restaurant: Optional[str] = None
    restaurant_location: Optional[str] = None
    michelin_stars: int = 0
    experience_years: int = 0
    expert_rating: float = 4.5
    battles_won: int = 0
    specialties: List[str] = []
    awards: List[str] = []
    certifications: List[str] = []
    experience: List[Any] = []

    model_config = ConfigDict(from_attributes=True)


class RestaurantProfileResponse(BaseModel):
    id: str
    name: str
    logo_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    location: str
    cuisine: str
    michelin_stars: int = 0
    description: Optional[str] = None
    website: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: str
    role: UserRole
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    is_active: bool
    is_verified: bool
    is_master_chef: bool
    created_at: datetime
    chef_profile: Optional[ChefProfileResponse] = None
    restaurant_profile: Optional[RestaurantProfileResponse] = None
    followers_count: int = 0
    following_count: int = 0
    posts_count: int = 0
    is_following: bool = False

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    title: Optional[str] = None
    restaurant: Optional[str] = None
    restaurant_location: Optional[str] = None
    specialties: Optional[List[str]] = None
    awards: Optional[List[str]] = None

