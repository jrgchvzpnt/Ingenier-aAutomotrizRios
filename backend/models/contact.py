from pydantic import BaseModel, Field, EmailStr, validator
from datetime import datetime
from typing import Optional
import uuid


class ContactMessageCreate(BaseModel):
    """Model for creating a new contact message"""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: EmailStr = Field(..., max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('El nombre no puede estar vacío')
        return v.strip()

    @validator('phone')
    def phone_must_be_valid(cls, v):
        # Remove spaces and dashes
        cleaned = v.replace(' ', '').replace('-', '')
        if not cleaned.isdigit():
            raise ValueError('El teléfono debe contener solo números')
        return cleaned

    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('El mensaje no puede estar vacío')
        return v.strip()


class ContactMessage(ContactMessageCreate):
    """Model for contact message with database fields"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default='new')

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
