from sqlmodel import Session, select
from passlib.context import CryptContext
from models.entities import User
from models.user_create import UserCreate
from models.user_detail import UserDetail
from typing import Optional, List

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# === User Operations ===

def create_user(session: Session, user_data: UserCreate) -> UserDetail:
    """
    Create a new user with hashed password.
    """
    # Check if username already exists
    existing_user = session.exec(select(User).where(User.username == user_data.username)).first()
    if existing_user:
        raise Exception("Username already taken")

    # Hash the password
    secure_password = pwd_context.hash(user_data.password)

    # Create a new user
    new_user = User(username=user_data.username, secure_password=secure_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Explicitly return UserDetail
    return UserDetail(id=new_user.id, username=new_user.username)

def get_user_by_username(session: Session, username: str) -> Optional[UserDetail]:
    """
    Fetch a user by their username.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None

    # Explicitly return UserDetail
    return UserDetail(id=user.id, username=user.username)


def verify_user_credentials(session: Session, username: str, password: str) -> Optional[User]:
    """
    Verify user credentials and return the User entity if valid.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if user and pwd_context.verify(password, user.secure_password):
        return user
    return None


def get_all_users(session: Session) -> List[UserDetail]:
    """
    Fetch all users from the database and return them as a list of UserDetail objects.
    """
    users = session.exec(select(User)).all()

    # Explicitly map each User entity to a UserDetail object
    return [UserDetail(id=user.id, username=user.username) for user in users]

def get_user_by_username(session: Session, username: str) -> Optional[UserDetail]:
    """
    Fetch a user by their username and map to UserDetail.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None

    # Explicitly map the User entity to the UserDetail model
    return UserDetail(id=user.id, username=user.username)

