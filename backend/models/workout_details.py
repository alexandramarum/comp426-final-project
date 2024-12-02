from pydantic import BaseModel
from datetime import date
from models.entities import WorkoutType

class WorkoutDetails(BaseModel):
    id: int
    type: WorkoutType
    duration: int
    date: date
    calories: float
    user_id: int 

