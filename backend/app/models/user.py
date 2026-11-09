import enum
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Enum, ForeignKey, Integer, Float, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base


class UserRole(str, enum.Enum):
    ENTHUSIAST = "enthusiast"
    CHEF = "chef"
    CRITIC_JUDGE = "critic_judge"
    RESTAURANT_EMPLOYER = "restaurant_employer"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.ENTHUSIAST, nullable=False)
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_master_chef = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    chef_profile = relationship("ChefProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    restaurant_profile = relationship("RestaurantProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")
    recipes = relationship("Recipe", back_populates="author", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    saved_posts = relationship("SavedPost", back_populates="user", cascade="all, delete-orphan")
    battle_submissions = relationship("BattleSubmission", back_populates="chef", cascade="all, delete-orphan")
    judge_evaluations = relationship("JudgeEvaluation", back_populates="judge", cascade="all, delete-orphan")
    job_applications = relationship("JobApplication", back_populates="applicant", cascade="all, delete-orphan")
    notifications = relationship("Notification", foreign_keys="[Notification.recipient_id]", back_populates="recipient", cascade="all, delete-orphan")

    # Following relationships
    following = relationship(
        "Follower",
        foreign_keys="[Follower.follower_id]",
        back_populates="follower",
        cascade="all, delete-orphan"
    )
    followers = relationship(
        "Follower",
        foreign_keys="[Follower.followed_id]",
        back_populates="followed",
        cascade="all, delete-orphan"
    )


class ChefProfile(Base):
    __tablename__ = "chef_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    title = Column(String(150), default="Chef")
    restaurant = Column(String(200), nullable=True)
    restaurant_location = Column(String(200), nullable=True)
    michelin_stars = Column(Integer, default=0)
    experience_years = Column(Integer, default=0)
    expert_rating = Column(Float, default=4.5)
    battles_won = Column(Integer, default=0)
    specialties = Column(JSON, default=list)  # List of culinary specialties
    awards = Column(JSON, default=list)       # List of awards / medals
    certifications = Column(JSON, default=list)
    experience = Column(JSON, default=list)   # Work history list of objects

    user = relationship("User", back_populates="chef_profile")


class RestaurantProfile(Base):
    __tablename__ = "restaurant_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=True)
    name = Column(String(200), nullable=False)
    logo_url = Column(String(500), nullable=True)
    cover_image_url = Column(String(500), nullable=True)
    location = Column(String(200), nullable=False)
    cuisine = Column(String(100), nullable=False)
    michelin_stars = Column(Integer, default=0)
    description = Column(Text, nullable=True)
    website = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="restaurant_profile")
    job_positions = relationship("JobPosition", back_populates="restaurant", cascade="all, delete-orphan")


class Follower(Base):
    __tablename__ = "followers"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    follower_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    followed_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    follower = relationship("User", foreign_keys=[follower_id], back_populates="following")
    followed = relationship("User", foreign_keys=[followed_id], back_populates="followers")

