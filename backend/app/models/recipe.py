import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Float, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)
    gallery_urls = Column(JSON, default=list)
    prep_time_minutes = Column(Integer, default=30)
    cook_time_minutes = Column(Integer, default=45)
    servings = Column(Integer, default=2)
    difficulty = Column(String(50), default="Intermediate")  # Easy, Intermediate, Master, Experimental
    cuisine = Column(String(100), default="Modernist")
    dietary_tags = Column(JSON, default=list)               # ['Vegetarian', 'Gluten-Free', etc.]
    instructions = Column(JSON, default=list)               # ['Step 1', 'Step 2', ...]
    
    # Nutrition fields
    calories = Column(Integer, default=450)
    protein = Column(Float, default=25.0)
    carbs = Column(Float, default=40.0)
    fat = Column(Float, default=18.0)
    fiber = Column(Float, default=4.0)
    nutrition_source = Column(String(150), default="Foodoscope Estimated")

    # Flavor profile (0-100)
    flavor_umami = Column(Integer, default=80)
    flavor_savory = Column(Integer, default=85)
    flavor_acidic = Column(Integer, default=65)
    flavor_sweet = Column(Integer, default=30)
    flavor_bitter = Column(Integer, default=20)
    flavor_spicy = Column(Integer, default=15)
    flavor_aroma_notes = Column(JSON, default=list)

    # Computational Gastronomy pairings
    pairing_suggestions = Column(JSON, default=list)

    rating = Column(Float, default=4.9)
    review_count = Column(Integer, default=0)
    saves_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="recipes")
    ingredients = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete-orphan")


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    recipe_id = Column(String(36), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(200), nullable=False)
    quantity = Column(String(100), nullable=False)
    category = Column(String(50), default="pantry")  # protein, produce, dairy, spice, pantry, molecular
    flavor_compounds = Column(JSON, default=list)

    recipe = relationship("Recipe", back_populates="ingredients")

