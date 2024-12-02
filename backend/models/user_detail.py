from pydantic import BaseModel

class UserDetail(BaseModel):
    id: int 
    username: str 

