from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class IngredientSchema(BaseModel):
    name: str
    quantity: str
    category: Optional[str] = "pantry"
    flavor_compounds: Optional[List[str]] = []


class RecipeCreate(BaseModel):
    title: str
    description: str
    image_url: str
    gallery_urls: List[str] = []
    prep_time_minutes: int = 30
    cook_time_minutes: int = 45
    servings: int = 2
    difficulty: str = "Intermediate"
    cuisine: str = "Modernist"
    dietary_tags: List[str] = []
    instructions: List[str] = []
    ingredients: List[IngredientSchema] = []
    calories: Optional[int] = 450
    protein: Optional[float] = 25.0
    carbs: Optional[float] = 40.0
    fat: Optional[float] = 18.0
    fiber: Optional[float] = 4.0
    flavor_umami: Optional[int] = 80
    flavor_savory: Optional[int] = 85
    flavor_acidic: Optional[int] = 65
    flavor_sweet: Optional[int] = 30
    flavor_bitter: Optional[int] = 20
    flavor_spicy: Optional[int] = 15
    flavor_aroma_notes: Optional[List[str]] = []
    pairing_suggestions: Optional[List[Dict[str, Any]]] = []


class RecipeResponse(BaseModel):
    id: str
    chef_id: str
    chef_name: str
    chef_username: str
    chef_avatar: Optional[str] = None
    chef_restaurant: Optional[str] = None
    title: str
    description: str
    image_url: str
    gallery_urls: List[str] = []
    prep_time_minutes: int
    cook_time_minutes: int
    servings: int
    difficulty: str
    cuisine: str
    dietary_tags: List[str] = []
    instructions: List[str] = []
    ingredients: List[IngredientSchema] = []
    calories: int
    protein: float
    carbs: float
    fat: float
    fiber: Optional[float] = None
    flavor_umami: int
    flavor_savory: int
    flavor_acidic: int
    flavor_sweet: int
    flavor_bitter: int
    flavor_spicy: int
    flavor_aroma_notes: List[str] = []
    pairing_suggestions: List[Dict[str, Any]] = []
    likes_count: int = 0
    comments_count: int = 0
    saves_count: int = 0
    rating: float = 4.9
    review_count: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

