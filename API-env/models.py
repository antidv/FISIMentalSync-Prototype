from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime, Float
from database import Base


class User(Base):

    __tablename__ = "users"

#CodigoAlumno
#NombreAlumno
#SexoAlumno
#EscuelaAlumno
#HistorialPonderado
#CorreoAlumno
#FechaNacimiento
#Estado(Regular/Observado)

    CodigoAlumno = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, index=True)
    sexo = Column(String(50), unique=True, index=True)
    escuela = Column(String(50), unique=True, index=True)
    Ponderado = Column(Float, unique=True, index=True)
    correo = Column(String(50), unique=True, index=True)
    fechaNacimiento = Column(DateTime)
    estado = Column(String(50), unique=True, index=True)

class Post(Base):

    __tablename__ = "posts"

    CodigoAlumno = Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer, unique=True, index=True)
    nombre = Column(String(50), unique=True, index=True)
    sexo = Column(String(50), unique=True, index=True)
    escuela = Column(String(50), unique=True, index=True)
    Ponderado = Column(Float, unique=True, index=True)
    correo = Column(String(50), unique=True, index=True)
    fechaNacimiento = Column(DateTime)
    estado = Column(String(50), unique=True, index=True)

    