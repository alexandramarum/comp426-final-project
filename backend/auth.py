from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from database import get_session
from services.user_service import create_user, verify_user_credentials
from models.user_create import UserCreate
from models.user_detail import UserDetail
from models.entities import User
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import os
import logging

logging.basicConfig(level=logging.DEBUG)


load_dotenv()

SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", 15))

auth_router = APIRouter()
register_router = APIRouter()
login_router = APIRouter()


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = (
            datetime.now(timezone.utc) + expires_delta
        ) 
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=15
        ) 
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)


def get_current_user(token: str, session: Session = Depends(get_session)) -> User:
    logging.debug(f"here")
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = session.get(User, int(user_id))
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        logging.debug(f"DEBUG: Retrieved user: {user}")  
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@register_router.post("/register", response_model=UserDetail)
def register(user: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user.
    """
    try:
        return create_user(session, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@login_router.post("/login")
def login(username: str, password: str, session: Session = Depends(get_session)):
    """
    Log in and return a JWT token if credentials are valid.
    """
    user = verify_user_credentials(session, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/me", response_model=UserDetail)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Get the current authenticated user's details.
    """
    return UserDetail(id=current_user.id, username=current_user.username)
