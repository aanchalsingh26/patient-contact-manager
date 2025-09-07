 # models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date
from sqlalchemy import Column, String

class PatientBase(SQLModel):
    first_name: str
    last_name: str
    address: Optional[str] = None
    email: Optional[str] = Field(default=None, sa_column=Column(String, unique=True, index=True))
    phone_number: Optional[str] = Field(default=None, sa_column=Column(String, unique=True, index=True))
    date_of_birth: Optional[date] = None

class Patient(PatientBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

