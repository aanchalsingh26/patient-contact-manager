 # main.py
from fastapi import FastAPI, HTTPException, Depends, Query
from typing import List, Optional
from sqlmodel import select, Session
from fastapi.middleware.cors import CORSMiddleware

import models, database, schemas

app = FastAPI(title="Contact Management API")

# Adjust origins to your React dev URL
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.on_event("startup")
def on_startup():
    database.create_db_and_tables()

# Create
@app.post("/patients/", response_model=schemas.PatientRead, status_code=201)
def create_patient(payload: schemas.PatientCreate, session: Session = Depends(database.get_session)):
    # Duplicate checks: email and phone
    if payload.email:
        existing = session.exec(select(models.Patient).where(models.Patient.email == payload.email)).first()
        if existing:
            raise HTTPException(status_code=400, detail="A patient with this email already exists.")
    if payload.phone_number:
        existing = session.exec(select(models.Patient).where(models.Patient.phone_number == payload.phone_number)).first()
        if existing:
            raise HTTPException(status_code=400, detail="A patient with this phone number already exists.")

    patient = models.Patient(**payload.dict(exclude_none=True))
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient

# Read list (with simple search & pagination)
@app.get("/patients/", response_model=List[schemas.PatientRead])
def list_patients(
    q: Optional[str] = Query(None, description="search name/email/phone"),
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    session: Session = Depends(database.get_session),
):
    statement = select(models.Patient)
    if q:
        like = f"%{q}%"
        statement = statement.where(
            (models.Patient.first_name.ilike(like)) |
            (models.Patient.last_name.ilike(like)) |
            (models.Patient.email.ilike(like)) |
            (models.Patient.phone_number.ilike(like))
        )
    statement = statement.offset(offset).limit(limit)
    results = session.exec(statement).all()
    return results

# Read single
@app.get("/patients/{patient_id}", response_model=schemas.PatientRead)
def get_patient(patient_id: int, session: Session = Depends(database.get_session)):
    patient = session.get(models.Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# Update (full)
@app.put("/patients/{patient_id}", response_model=schemas.PatientRead)
def update_patient(patient_id: int, payload: schemas.PatientUpdate, session: Session = Depends(database.get_session)):
    patient = session.get(models.Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # If user tries to change email/phone to an existing value owned by another record -> error
    if payload.email and payload.email != patient.email:
        if session.exec(select(models.Patient).where(models.Patient.email == payload.email)).first():
            raise HTTPException(status_code=400, detail="Another patient with this email already exists.")
    if payload.phone_number and payload.phone_number != patient.phone_number:
        if session.exec(select(models.Patient).where(models.Patient.phone_number == payload.phone_number)).first():
            raise HTTPException(status_code=400, detail="Another patient with this phone number already exists.")

    update_data = payload.dict(exclude_unset=True)
    for key, val in update_data.items():
        setattr(patient, key, val)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient

# Delete
@app.delete("/patients/{patient_id}", status_code=204)
def delete_patient(patient_id: int, session: Session = Depends(database.get_session)):
    patient = session.get(models.Patient, patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    session.delete(patient)
    session.commit()
    return

