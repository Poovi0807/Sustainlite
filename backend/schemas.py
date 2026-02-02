from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

# Activity Schemas
class ActivityBase(BaseModel):
    category: str  # energy, water, transport, waste
    action: str
    value: float
    unit: str
    notes: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityResponse(ActivityBase):
    id: int
    user_id: int
    date: datetime
    
    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Dashboard Stats Schema
class DashboardStats(BaseModel):
    total_activities: int
    energy_saved: float
    water_saved: float
    transport_emissions: float
    waste_reduced: float
    recent_activities: list[ActivityResponse]
