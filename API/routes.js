import  express  from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import connection from '../services/dataService.js';
import cors from 'cors';


const app = express()
app.use(express.json());
app.use(cors());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Para ver los campos de  estudiantes
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

//Para ver los campos de  psicologos
app.get('/pong', async (req, res) => {

    try {

    const connection = await import('../services/dataService.js');

    const connectionInstance = await connection.default;

    const [rows] = await connectionInstance.query('SELECT * FROM Psicologo');
    res.json(rows[0]);
    } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
    }
  });



  app.post('/login', async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
      const connectionInstance = await connection;
      
      let [rows] = await connectionInstance.query('SELECT * FROM Psicologo WHERE correo = ? AND contrasena = ?', [correo, contrasena]);
      
      if (rows.length === 0) {
        [rows] = await connectionInstance.query('SELECT * FROM Alumno WHERE correo = ? AND contrasena = ?', [correo, contrasena]);
      }
      
      const user = rows[0] || {};
      
      if (user.correo) {
        res.json({ success: true, role: user.table });
      } else {
        res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Hubo un error al ejecutar la consulta');
    }
   });
   
   
   
   
 
 

app.get('/estudiantes', (req, res) => res.send('Obteniendo estudiantes'))

app.post('/estudiantes', (req, res) => res.send('Creando estudiantes'))


app.listen(3000)
console.log('Servidor corriendo en el puerto 3000')
