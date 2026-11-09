from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class NotificationResponse(BaseModel):
    id: str
    type: str
    actor_name: str
    actor_avatar: Optional[str] = None
    content: str
    target_preview: Optional[str] = None
    timestamp: datetime
    is_read: bool

    model_config = ConfigDict(from_attributes=True)


class MessageCreate(BaseModel):
    text: str


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender_id: str
    sender_name: str
    sender_avatar: Optional[str] = None
    text: str
    is_read: bool
    is_self: bool = False
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)


class ConversationParticipant(BaseModel):
    id: str
    name: str
    username: str
    avatar: Optional[str] = None
    title: Optional[str] = None
    restaurant: Optional[str] = None
    is_verified: bool = False


class ConversationResponse(BaseModel):
    id: str
    participant: ConversationParticipant
    last_message: Optional[str] = None
    timestamp: datetime
    unread_count: int = 0
    messages: List[MessageResponse] = []

    model_config = ConfigDict(from_attributes=True)

