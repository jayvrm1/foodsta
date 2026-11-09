from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class JudgeCriteriaScores(BaseModel):
    creativity: float = Field(..., ge=0, le=100)             # weight: 25%
    taste_and_flavor: float = Field(..., ge=0, le=100)       # weight: 25%
    presentation: float = Field(..., ge=0, le=100)           # weight: 20%
    cooking_technique: float = Field(..., ge=0, le=100)      # weight: 20%
    ingredient_utilisation: float = Field(..., ge=0, le=100) # weight: 10%


class JudgeEvaluationCreate(BaseModel):
    scores: JudgeCriteriaScores
    written_feedback: str


class JudgeEvaluationResponse(BaseModel):
    id: str
    judge_id: str
    judge_name: str
    judge_title: str
    judge_avatar: Optional[str] = None
    scores: JudgeCriteriaScores
    overall_score: float
    written_feedback: str
    evaluated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class BattleSubmissionCreate(BaseModel):
    dish_name: str
    image_url: str
    video_url: Optional[str] = None
    inspiration: str
    ingredients: List[Dict[str, Any]]
    instructions: List[str]
    cooking_time_minutes: int = 45
    flavor_compounds_identified: List[str] = []


class BattleSubmissionResponse(BaseModel):
    id: str
    battle_id: str
    chef_id: str
    chef_username: str
    chef_name: str
    chef_avatar: Optional[str] = None
    chef_restaurant: Optional[str] = None
    dish_name: str
    image_url: str
    video_url: Optional[str] = None
    inspiration: str
    ingredients: List[Dict[str, Any]] = []
    instructions: List[str] = []
    cooking_time_minutes: int
    flavor_compounds_identified: List[str] = []
    recipe_db_synergy_index: float
    flavor_db_pairing_score: float
    community_votes: int = 0
    has_voted: bool = False
    judge_evaluations: List[JudgeEvaluationResponse] = []
    expert_composite_score: float = 0.0
    final_rank: Optional[int] = None
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CompetitionCreate(BaseModel):
    title: str
    theme: str
    description: str
    cover_image: str
    status: str = "active"  # active, upcoming, completed
    required_ingredients: List[str] = []
    rules: List[str] = []
    submission_deadline: str
    prize_pool: str = "$15,000 USD"
    prize_first: str = "$10,000 + Golden Truffle Trophy"
    prize_second: str = "$3,500 + Silver Knife"
    prize_third: str = "$1,500 + Bronze Pin"


class CompetitionResponse(BaseModel):
    id: str
    title: str
    theme: str
    description: str
    cover_image: str
    status: str
    required_ingredients: List[str] = []
    rules: List[str] = []
    submission_deadline: str
    prize_pool: str
    prize_first: str
    prize_second: str
    prize_third: str
    participants_count: int = 0
    submissions: List[BattleSubmissionResponse] = []
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

