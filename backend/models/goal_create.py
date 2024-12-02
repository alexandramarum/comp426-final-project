from pydantic import BaseModel
from datetime import date
from models.entities import GoalStatus

class GoalCreate(BaseModel):
    description: str
    target_date: date
    status: GoalStatus
