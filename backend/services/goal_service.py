from sqlmodel import Session, select
from datetime import date
from models.entities import Goal
from models.goal_create import GoalCreate
from models.goal_details import GoalDetails
from typing import List

def create_goal(session: Session, goal_data: GoalCreate, user_id: int) -> GoalDetails:
    """
    Create a new goal for the specified user.
    """
    goal = Goal(
        user_id=user_id,
        description=goal_data.description,
        target_date=goal_data.target_date,
        status=goal_data.status,
    )
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return GoalDetails.model_validate(goal)

def get_goals(session: Session, user_id: int) -> List[GoalDetails]:
    """
    Retrieve all goals for the specified user.
    """
    goals = session.exec(select(Goal).where(Goal.user_id == user_id)).all()
    return [GoalDetails.model_validate(goal) for goal in goals]

def update_goal(session: Session, goal_id: int, updated_data: GoalCreate, user_id: int) -> GoalDetails:
    """
    Update an existing goal for the specified user.
    """
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != user_id:
        raise Exception("Goal not found or unauthorized")
    goal.description = updated_data.description
    goal.target_date = updated_data.target_date
    goal.status = updated_data.status
    session.commit()
    session.refresh(goal)
    return GoalDetails.model_validate(goal)

def delete_goal(session: Session, goal_id: int, user_id: int):
    """
    Delete a goal by ID for the specified user.
    """
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != user_id:
        raise Exception("Goal not found or unauthorized")
    session.delete(goal)
    session.commit()