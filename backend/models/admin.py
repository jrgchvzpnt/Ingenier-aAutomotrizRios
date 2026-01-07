from pydantic import BaseModel, Field
from typing import Optional


class AdminUser(BaseModel):
    """Admin user model"""
    username: str
    hashed_password: str
    created_at: str


class LoginRequest(BaseModel):
    """Login request model"""
    username: str
    password: str


class LoginResponse(BaseModel):
    """Login response model"""
    success: bool
    message: str
    token: Optional[str] = None
    username: Optional[str] = None


class TokenVerifyRequest(BaseModel):
    """Token verification request"""
    token: str
