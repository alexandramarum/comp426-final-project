from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlmodel import SQLModel
from database import engine, get_session
from auth import auth_router, register_router, login_router, get_current_user
from services.workout_service import (
    create_workout,
    get_workouts,
    update_workout,
    delete_workout,
)
from services.goal_service import create_goal, get_goals, update_goal, delete_goal
from services.user_service import get_all_users, get_user_by_username
from models.workout_create import WorkoutCreate
from models.workout_details import WorkoutDetails
from models.goal_create import GoalCreate
from models.goal_details import GoalDetails
from models.user_detail import UserDetail
from models.entities import User
from typing import List
import logging
import os
from dotenv import load_dotenv
import httpx

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; restrict this in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize database
SQLModel.metadata.create_all(engine)

# Include authentication routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(register_router, prefix="/auth", tags=["Auth"])
app.include_router(login_router, prefix="/auth", tags=["Auth"])


# Workout
@app.post("/workouts/", response_model=WorkoutDetails, tags=["Workouts"])
def add_workout(
    workout: WorkoutCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return create_workout(session, workout, current_user.id)


@app.get("/workouts/", response_model=list[WorkoutDetails], tags=["Workouts"])
def get_all_workouts(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    logging.debug(f"DEBUG: Retrieved user in GET: {current_user}")
    return get_workouts(session, current_user.id)


@app.put("/workouts/{workout_id}", response_model=WorkoutDetails, tags=["Workouts"])
def update_aworkout(
    workout_id: int,
    updated_workout: WorkoutCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return update_workout(session, workout_id, updated_workout, current_user.id)


@app.delete("/workouts/{workout_id}", tags=["Workouts"])
def delete_aworkout(
    workout_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    delete_workout(session, workout_id, current_user.id)
    return {"message": "Workout deleted successfully"}


# Goal
@app.post("/goals/", response_model=GoalDetails, tags=["Goals"])
def add_agoal(
    goal: GoalCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return create_goal(session, goal, current_user.id)


@app.get("/goals/", response_model=list[GoalDetails], tags=["Goals"])
def retrieve_goals(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return get_goals(session, current_user.id)


@app.put("/goals/{goal_id}", response_model=GoalDetails, tags=["Goals"])
def update_agoal(
    goal_id: int,
    updated_goal: GoalCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return update_goal(session, goal_id, updated_goal, current_user.id)


@app.delete("/goals/{goal_id}", tags=["Goals"])
def delete_agoal(
    goal_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    delete_goal(session, goal_id, current_user.id)
    return {"message": "Goal deleted successfully"}


@app.get("/users/{username}", response_model=UserDetail, tags=["Users"])
def get_user(
    username: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get details of a user by username. Requires authentication.
    """
    user = get_user_by_username(session, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/users/", response_model=List[UserDetail], tags=["Users"])
def get_all_users(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Get a list of all users. Requires authentication.
    """
    return get_all_users(session)


@app.get("/api/nearby-gyms", tags=["Gyms"])
async def gyms(
    location: str = Query(
        ..., description="The location in 'latitude,longitude' format"
    ),
    radius: int = Query(1000, description="Radius in meters"),
    place_type: str = Query("gym", description="Type of place to search"),
):
    # Google Places API URL
    google_api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    # Parameters to pass to the Google Places API
    params = {
        "location": location,
        "radius": radius,
        "type": place_type,
        "key": GOOGLE_API_KEY,
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(google_api_url, params=params)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch data from Google Places API",
                )
            return response.json()

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=500,
                detail=f"An error occurred while making a request to Google Places API: {str(e)}",
            )
