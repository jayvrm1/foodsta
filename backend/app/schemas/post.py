from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CommentCreate(BaseModel):
    content: str


class CommentResponse(BaseModel):
    id: str
    username: str
    user_avatar: Optional[str] = None
    user_title: Optional[str] = None
    is_verified: bool = False
    content: str
    created_at: datetime
    likes_count: int = 0
    is_liked: bool = False

    model_config = ConfigDict(from_attributes=True)


class PostCreate(BaseModel):
    image_url: str
    media_type: str = "image"
    video_url: Optional[str] = None
    aspect_ratio: str = "4:5"
    caption: str
    hashtags: List[str] = []
    location_tag: Optional[str] = None
    recipe_id: Optional[str] = None
    battle_id: Optional[str] = None
    nutrition_preview: Optional[Dict[str, Any]] = None


class PostResponse(BaseModel):
    id: str
    chef_id: str
    chef_username: str
    chef_name: str
    chef_avatar: Optional[str] = None
    chef_restaurant: Optional[str] = None
    is_verified: bool = False
    is_master_chef: bool = False
    image_url: str
    media_type: str
    video_url: Optional[str] = None
    aspect_ratio: str
    caption: str
    hashtags: List[str]
    location_tag: Optional[str] = None
    recipe_id: Optional[str] = None
    recipe_title: Optional[str] = None
    battle_id: Optional[str] = None
    nutrition_preview: Optional[Dict[str, Any]] = None
    likes_count: int = 0
    comments_count: int = 0
    shares_count: int = 0
    saves_count: int = 0
    is_liked: bool = False
    is_saved: bool = False
    created_at: datetime
    comments: List[CommentResponse] = []

    model_config = ConfigDict(from_attributes=True)

