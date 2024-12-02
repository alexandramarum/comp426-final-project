from sqlmodel import Session, select
from passlib.context import CryptContext
from models.entities import User
from models.user_create import UserCreate
from models.user_detail import UserDetail
from typing import Optional, List

hashing_tool = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(session: Session, user_data: UserCreate) -> UserDetail:
    """
    Create a new user with hashed password.
    """
    existing_user = session.exec(select(User).where(User.username == user_data.username)).first()
    if existing_user:
        raise Exception("Username already taken")

    secure_password = hashing_tool.hash(user_data.password)

    new_user = User(username=user_data.username, secure_password=secure_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return UserDetail(id=new_user.id, username=new_user.username)

def get_user_by_username(session: Session, username: str) -> Optional[UserDetail]:
    """
    Fetch a user by their username.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None

    return UserDetail(id=user.id, username=user.username)


def verify_user_credentials(session: Session, username: str, password: str) -> Optional[User]:
    """
    Verify user credentials and return the User entity if valid.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if user and hashing_tool.verify(password, user.secure_password):
        return user
    return None


def get_all_users(session: Session) -> List[UserDetail]:
    """
    Fetch all users from the database and return them as a list of UserDetail objects.
    """
    users = session.exec(select(User)).all()

    return [UserDetail(id=user.id, username=user.username) for user in users]

def get_user_by_username(session: Session, username: str) -> Optional[UserDetail]:
    """
    Fetch a user by their username and map to UserDetail.
    """
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None

    return UserDetail(id=user.id, username=user.username)

