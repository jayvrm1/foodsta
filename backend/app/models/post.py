import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from backend.app.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    media_type = Column(String(20), default="image")  # 'image' or 'video'
    video_url = Column(String(500), nullable=True)
    aspect_ratio = Column(String(10), default="4:5")  # '1:1', '4:5', '9:16'
    caption = Column(Text, nullable=False)
    hashtags = Column(JSON, default=list)             # ['#CulinaryArt', '#FoodstaChef']
    location_tag = Column(String(255), nullable=True)
    recipe_id = Column(String(36), ForeignKey("recipes.id", ondelete="SET NULL"), nullable=True)
    battle_id = Column(String(36), ForeignKey("competitions.id", ondelete="SET NULL"), nullable=True)
    nutrition_preview = Column(JSON, nullable=True)   # {"calories": 420, "protein": 32}
    shares_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="posts")
    recipe = relationship("Recipe", foreign_keys=[recipe_id])
    competition = relationship("Competition", foreign_keys=[battle_id])
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan", order_by="desc(Comment.created_at)")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan")
    saves = relationship("SavedPost", back_populates="post", cascade="all, delete-orphan")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    post_id = Column(String(36), ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    post = relationship("Post", back_populates="comments")
    user = relationship("User", back_populates="comments")


class Like(Base):
    __tablename__ = "likes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    post_id = Column(String(36), ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    post = relationship("Post", back_populates="likes")
    user = relationship("User", back_populates="likes")


class SavedPost(Base):
    __tablename__ = "saved_posts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    post_id = Column(String(36), ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    post = relationship("Post", back_populates="saves")
    user = relationship("User", back_populates="saved_posts")

