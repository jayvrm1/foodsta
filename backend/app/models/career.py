import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from backend.app.database import Base


class JobPosition(Base):
    __tablename__ = "job_positions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    restaurant_id = Column(String(36), ForeignKey("restaurant_profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    cuisine = Column(String(100), nullable=False)
    salary_range = Column(String(100), nullable=False)
    employment_type = Column(String(100), default="Full-time")
    experience_required = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    requirements = Column(JSON, default=list)
    perks = Column(JSON, default=list)
    is_active = Column(Boolean, default=True)
    posted_date = Column(DateTime, default=datetime.utcnow)

    restaurant = relationship("RestaurantProfile", back_populates="job_positions")
    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    job_id = Column(String(36), ForeignKey("job_positions.id", ondelete="CASCADE"), nullable=False)
    applicant_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), default="submitted")  # submitted, reviewing, shortlisted, rejected, hired
    portfolio_summary = Column(JSON, default=dict)
    cover_note = Column(Text, nullable=True)
    applied_at = Column(DateTime, default=datetime.utcnow)

    job = relationship("JobPosition", back_populates="applications")
    applicant = relationship("User", back_populates="job_applications")

