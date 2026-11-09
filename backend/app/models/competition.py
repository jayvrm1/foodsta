import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Float, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base


class Competition(Base):
    __tablename__ = "competitions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    theme = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    cover_image = Column(String(500), nullable=False)
    status = Column(String(20), default="active")  # 'active', 'upcoming', 'completed'
    required_ingredients = Column(JSON, default=list)
    rules = Column(JSON, default=list)
    submission_deadline = Column(String(100), nullable=False)
    prize_pool = Column(String(100), default="$15,000 USD")
    prize_first = Column(String(100), default="$10,000 + Golden Truffle Trophy")
    prize_second = Column(String(100), default="$3,500 + Silver Knife")
    prize_third = Column(String(100), default="$1,500 + Bronze Pin")
    created_at = Column(DateTime, default=datetime.utcnow)

    submissions = relationship("BattleSubmission", back_populates="competition", cascade="all, delete-orphan")


class BattleSubmission(Base):
    __tablename__ = "battle_submissions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    competition_id = Column(String(36), ForeignKey("competitions.id", ondelete="CASCADE"), nullable=False)
    chef_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    dish_name = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=False)
    video_url = Column(String(500), nullable=True)
    inspiration = Column(Text, nullable=False)
    ingredients = Column(JSON, default=list)       # list of {name, quantity}
    instructions = Column(JSON, default=list)      # list of string steps
    cooking_time_minutes = Column(Integer, default=45)
    flavor_compounds_identified = Column(JSON, default=list)
    recipe_db_synergy_index = Column(Float, default=90.0)
    flavor_db_pairing_score = Column(Float, default=92.0)
    community_votes = Column(Integer, default=0)
    expert_composite_score = Column(Float, default=0.0)
    final_rank = Column(Integer, nullable=True)     # 1, 2, 3
    submitted_at = Column(DateTime, default=datetime.utcnow)

    competition = relationship("Competition", back_populates="submissions")
    chef = relationship("User", back_populates="battle_submissions")
    judge_evaluations = relationship("JudgeEvaluation", back_populates="submission", cascade="all, delete-orphan")
    votes = relationship("BattleVote", back_populates="submission", cascade="all, delete-orphan")


class JudgeEvaluation(Base):
    __tablename__ = "judge_evaluations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    submission_id = Column(String(36), ForeignKey("battle_submissions.id", ondelete="CASCADE"), nullable=False)
    judge_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Official Weighted Criteria:
    # Creativity: 25%
    # Taste and Flavour: 25%
    # Presentation: 20%
    # Cooking Technique: 20%
    # Ingredient Utilisation: 10%
    creativity = Column(Float, nullable=False)
    taste_and_flavor = Column(Float, nullable=False)
    presentation = Column(Float, nullable=False)
    cooking_technique = Column(Float, nullable=False)
    ingredient_utilisation = Column(Float, nullable=False)
    overall_score = Column(Float, nullable=False)
    written_feedback = Column(Text, nullable=False)
    evaluated_at = Column(DateTime, default=datetime.utcnow)

    submission = relationship("BattleSubmission", back_populates="judge_evaluations")
    judge = relationship("User", back_populates="judge_evaluations")


class BattleVote(Base):
    __tablename__ = "battle_votes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    submission_id = Column(String(36), ForeignKey("battle_submissions.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    submission = relationship("BattleSubmission", back_populates="votes")

