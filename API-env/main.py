from ast import Str
from fastapi import FastAPI;
from pydantic import BaseModel;

app = FastAPI();

class Libro(BaseModel):
    id: int;
    titulo: str;
    autor: str;
    anio: int;

libro = [

    {
    "id": 1,
    "titulo": "Libro 1",
    "autor": "Autor 1",
    "anio": 2000
    },

    {
    "id": 2,
    "titulo": "Libro 2",
    "autor": "Pep 2",
    "anio": 2001

    }

]

@app.get("/")
def index():
    return {"message": "Hello holam pseudopapus"};

@app.get("/libros/{id}")
def mostrar_libro2(id: int):
    return {"data": {"id": id, "titulo": "Libro 1"}};

@app.post("/libros")
def insertar_libro(Libro: Libro):
    return {"message": f"Libro{Libro.titulo}insertado correctamente"};

@app.get("/libro/{id}")
def mostrar_libro(id: int):
    return list(filter(lambda libro: libro["id"] == id, libro))

@app.get("/libros")
def mostrar(autor: str):
    return list(filter(lambda libro: libro["autor"] == autor, libro))
