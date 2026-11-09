import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator


class Settings(BaseSettings):
    PROJECT_NAME: str = "FOODSTA 2.0 API"
    VERSION: str = "2.0.0"
    DEBUG: bool = True
    API_V1_STR: str = "/api"

    # Database Configuration (PostgreSQL supported, SQLite fallback for local dev)
    DATABASE_URL: str = "sqlite:///./foodsta.db"

    # JWT Authentication
    SECRET_KEY: str = "foodsta-jwt-secret-key-change-in-production-random-hash-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Uploads
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
    MAX_UPLOAD_SIZE_MB: int = 50

    # CORS
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    # Foodoscope APIs (Placeholder Architecture)
    RECIPEDB_API_BASE_URL: str = "https://api.foodoscope.com/recipedb/v1"
    RECIPEDB_API_KEY: str = ""

    FLAVORDB_API_BASE_URL: str = "https://api.foodoscope.com/flavordb/v1"
    FLAVORDB_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="allow"
    )


settings = Settings()
