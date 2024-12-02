from pydantic import BaseModel
from datetime import date
from models.entities import GoalStatus

class GoalDetails(BaseModel):
    id: int
    description: str
    target_date: date
    status: GoalStatus
    user_id: int  


