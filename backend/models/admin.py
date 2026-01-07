from pydantic import BaseModel, Field, validator
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


class ChangePasswordRequest(BaseModel):
    """Change password request"""
    current_password: str
    new_password: str = Field(..., min_length=6, max_length=100)
    
    @validator('new_password')
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError('La contraseña debe tener al menos 6 caracteres')
        return v

