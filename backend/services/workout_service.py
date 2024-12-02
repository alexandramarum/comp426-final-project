from sqlmodel import Session, select
from models.entities import Workout
from models.workout_create import WorkoutCreate
from models.workout_details import WorkoutDetails
from typing import List


def create_workout(session: Session, workout_data: WorkoutCreate, user_id: int) -> WorkoutDetails:
    """
    Create a new workout for the authenticated user.
    """
    new_workout = Workout(
        user_id=user_id,
        type=workout_data.type,
        duration=workout_data.duration,
        date=workout_data.date,
        calories=workout_data.calories,
    )
    session.add(new_workout)
    session.commit()
    session.refresh(new_workout)

    return WorkoutDetails(
        id=new_workout.id,
        user_id=new_workout.user_id,
        type=new_workout.type,
        duration=new_workout.duration,
        date=new_workout.date,
        calories=new_workout.calories,
    )


def get_workouts(session: Session, user_id: int) -> List[WorkoutDetails]:
    """
    Retrieve all workouts for the specified user.
    """
    workouts = session.exec(select(Workout).where(Workout.user_id == user_id)).all()

    return [
        WorkoutDetails(
            id=workout.id,
            user_id=workout.user_id,
            type=workout.type,
            duration=workout.duration,
            date=workout.date,
            calories=workout.calories,
        )
        for workout in workouts
    ]


def update_workout(session: Session, workout_id: int, updated_data: WorkoutCreate, user_id: int) -> WorkoutDetails:
    """
    Update an existing workout for the specified user.
    """
    workout = session.get(Workout, workout_id)
    if not workout or workout.user_id != user_id:
        raise Exception("Workout not found or unauthorized")

    workout.type = updated_data.type
    workout.duration = updated_data.duration
    workout.date = updated_data.date
    workout.calories = updated_data.calories

    session.commit()
    session.refresh(workout)

    return WorkoutDetails(
        id=workout.id,
        user_id=workout.user_id,
        type=workout.type,
        duration=workout.duration,
        date=workout.date,
        calories=workout.calories,
    )


def delete_workout(session: Session, workout_id: int, user_id: int):
    """
    Delete a workout by ID for the specified user.
    """
    workout = session.get(Workout, workout_id)
    if not workout or workout.user_id != user_id:
        raise Exception("Workout not found or unauthorized")
    
    session.delete(workout)
    session.commit()