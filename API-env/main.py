from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class Post(BaseModel):
    CodigoAlumno: int
    codigo: int
    nombre: str
    sexo: str
    escuela: str
    Ponderado: float
    correo: str
    fechaNacimiento: str
    estado: str

class User(BaseModel):
    CodigoAlumno: int
    nombre: str
    sexo: str
    escuela: str
    Ponderado: float
    correo: str
    fechaNacimiento: str
    estado: str

class UserBase(BaseModel):
    username: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
