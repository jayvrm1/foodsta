from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class JobPositionCreate(BaseModel):
    restaurant_id: str
    title: str
    cuisine: str
    salary_range: str
    employment_type: str = "Full-time"
    experience_required: str
    description: str
    requirements: List[str] = []
    perks: List[str] = []


class JobPositionResponse(BaseModel):
    id: str
    restaurant_id: str
    restaurant_name: str
    restaurant_logo: Optional[str] = None
    restaurant_location: str
    michelin_stars: int = 0
    title: str
    cuisine: str
    salary_range: str
    employment_type: str
    experience_required: str
    description: str
    requirements: List[str] = []
    perks: List[str] = []
    is_active: bool
    is_applied: bool = False
    posted_date: datetime

    model_config = ConfigDict(from_attributes=True)


class JobApplicationCreate(BaseModel):
    cover_note: Optional[str] = None
    portfolio_summary: Optional[Dict[str, Any]] = None


class JobApplicationResponse(BaseModel):
    id: str
    job_id: str
    applicant_id: str
    applicant_name: str
    status: str
    cover_note: Optional[str] = None
    applied_at: datetime

    model_config = ConfigDict(from_attributes=True)

