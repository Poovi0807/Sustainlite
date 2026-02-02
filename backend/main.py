from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from typing import List

from database import get_db, init_db, User, Activity
from schemas import (
    UserCreate, UserResponse, UserLogin, Token,
    ActivityCreate, ActivityResponse, DashboardStats
)
from auth import (
    get_password_hash, authenticate_user, create_access_token,
    get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
)

# Initialize FastAPI app
app = FastAPI(title="SustainLite API", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_db()

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "SustainLite API is running", "status": "healthy"}

# User Registration
@app.post("/api/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if username exists
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if email exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# User Login
@app.post("/api/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Get current user profile
@app.get("/api/users/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

# Create Activity
@app.post("/api/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def create_activity(
    activity: ActivityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Log a new sustainability activity"""
    db_activity = Activity(
        user_id=current_user.id,
        category=activity.category,
        action=activity.action,
        value=activity.value,
        unit=activity.unit,
        notes=activity.notes
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

# Get all activities for current user
@app.get("/api/activities", response_model=List[ActivityResponse])
def get_activities(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all activities for the current user"""
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).order_by(Activity.date.desc()).offset(skip).limit(limit).all()
    return activities

# Get activity by ID
@app.get("/api/activities/{activity_id}", response_model=ActivityResponse)
def get_activity(
    activity_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific activity by ID"""
    activity = db.query(Activity).filter(
        Activity.id == activity_id,
        Activity.user_id == current_user.id
    ).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity

# Delete activity
@app.delete("/api/activities/{activity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_activity(
    activity_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an activity"""
    activity = db.query(Activity).filter(
        Activity.id == activity_id,
        Activity.user_id == current_user.id
    ).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    db.delete(activity)
    db.commit()
    return None

# Get Dashboard Statistics
@app.get("/api/dashboard", response_model=DashboardStats)
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for the current user"""
    activities = db.query(Activity).filter(Activity.user_id == current_user.id).all()
    
    # Calculate statistics
    total_activities = len(activities)
    energy_saved = sum(a.value for a in activities if a.category == "energy")
    water_saved = sum(a.value for a in activities if a.category == "water")
    transport_emissions = sum(a.value for a in activities if a.category == "transport")
    waste_reduced = sum(a.value for a in activities if a.category == "waste")
    
    # Get recent activities (last 5)
    recent_activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).order_by(Activity.date.desc()).limit(5).all()
    
    return DashboardStats(
        total_activities=total_activities,
        energy_saved=energy_saved,
        water_saved=water_saved,
        transport_emissions=transport_emissions,
        waste_reduced=waste_reduced,
        recent_activities=recent_activities
    )

# Get recommendations based on user data
@app.get("/api/recommendations")
def get_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get personalized sustainability recommendations"""
    activities = db.query(Activity).filter(Activity.user_id == current_user.id).all()
    
    recommendations = []
    
    # Analyze activity patterns
    energy_activities = [a for a in activities if a.category == "energy"]
    water_activities = [a for a in activities if a.category == "water"]
    transport_activities = [a for a in activities if a.category == "transport"]
    waste_activities = [a for a in activities if a.category == "waste"]
    
    # Generate recommendations based on activity patterns
    if len(energy_activities) < 5:
        recommendations.append({
            "category": "energy",
            "title": "Track Your Energy Usage",
            "description": "Start logging your daily energy consumption to identify saving opportunities.",
            "priority": "high"
        })
    
    if len(water_activities) < 5:
        recommendations.append({
            "category": "water",
            "title": "Monitor Water Conservation",
            "description": "Track your water usage to reduce waste and save resources.",
            "priority": "high"
        })
    
    if len(transport_activities) < 5:
        recommendations.append({
            "category": "transport",
            "title": "Log Your Commute",
            "description": "Record your transportation methods to calculate your carbon footprint.",
            "priority": "medium"
        })
    
    if len(waste_activities) < 5:
        recommendations.append({
            "category": "waste",
            "title": "Track Waste Reduction",
            "description": "Monitor your recycling and waste reduction efforts.",
            "priority": "medium"
        })
    
    # Add general recommendations
    if total_activities := len(activities):
        if total_activities > 20:
            recommendations.append({
                "category": "general",
                "title": "Great Progress!",
                "description": f"You've logged {total_activities} activities. Keep up the excellent work!",
                "priority": "low"
            })
    
    return {"recommendations": recommendations}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
