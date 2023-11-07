import  express  from "express"

import connection from '../services/dataService.js';

const app = express()

app.get('/ping', async (req, res) => {
    try {
    const connection = await import('../services/dataService.js');
    const connectionInstance = await connection.default;
    const [rows] = await connectionInstance.query('SELECT * FROM Alumno');
    res.json(rows[0]);
    } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
    }
   });
   

app.get('/estudiantes', (req, res) => res.send('Obteniendo estudiantes'))

app.post('/estudiantes', (req, res) => res.send('Creando estudiantes'))


app.listen(3000)
console.log('Servidor corriendo en el puerto 3000')
