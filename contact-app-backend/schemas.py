from pydantic import BaseModel, EmailStr, StringConstraints
from typing import Annotated

# Phone validation with regex
PhoneType = Annotated[str, StringConstraints(pattern=r'^\+?\d{7,15}$')]

class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    address: str
    email: EmailStr
    phone_number: PhoneType

class PatientRead(BaseModel):
    id: int
    first_name: str
    last_name: str
    address: str
    email: EmailStr
    phone_number: PhoneType

    class Config:
        orm_mode = True

class PatientUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    address: str | None = None
    email: EmailStr | None = None
    phone_number: PhoneType | None = None
