 # database.py
from sqlmodel import SQLModel, create_engine, Session
from typing import Iterator
from pathlib import Path

DB_FILE = Path(__file__).parent / "patients.db"
sqlite_url = f"sqlite:///{DB_FILE}"

# echo=True for SQL debugging
engine = create_engine(sqlite_url, echo=False, connect_args={"check_same_thread": False})

def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)

def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session

