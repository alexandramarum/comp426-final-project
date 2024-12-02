from pydantic import BaseModel
from datetime import date
from models.entities import WorkoutType

class WorkoutCreate(BaseModel):
    type: WorkoutType
    duration: int
    date: date
    calories: float
