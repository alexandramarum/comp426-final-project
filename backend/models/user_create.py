from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str  # Username for login
    password: str  # Plaintext password to be hashed
