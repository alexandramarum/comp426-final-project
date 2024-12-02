from pydantic import BaseModel

class UserDetail(BaseModel):
    id: int 
    username: str 

    class Config:
        orm_mode = True  # Allows this schema to work with ORM models like SQLModel
