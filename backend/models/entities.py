from enum import Enum
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

#enums
class WorkoutType(str, Enum):
    CARDIO = "cardio"
    STRENGTH = "strength"
    FLEXIBILITY = "flexibility"
    OTHER = "other"

class GoalStatus(str, Enum):
    NOT_STARTED = "notstarted"
    IN_PROGRESS = "inprogress"
    COMPLETE = "complete"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, nullable=False)  # Used for login
    secure_password: str = Field(nullable=False)  # Hashed password  

#workout table
class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: WorkoutType  # Enum for workout type
    duration: int  
    date: date
    calories: float
    user_id: int = Field(foreign_key="user.id")  # Link to User table

#goal table
class Goal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description: str 
    target_date: date 
    status: GoalStatus = Field(default=GoalStatus.NOT_STARTED)  # Enum for goal status
    user_id: int = Field(foreign_key="user.id")  # Link to User table

