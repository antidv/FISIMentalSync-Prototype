// El { fileURLToPath } es para que no de problemas con el path
// El cors es para que no de problemas con el frontend

import express from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './dataService.js';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de prueba para que vean cómo es la conexión con la base de datos con un query simple
// Ignoren el nombre de la ruta, le puse ping porque es como un ping a la base de datos

app.get('/ping', async (req, res) => {

    try {
      // LEAN: Esto es para que no apliquen a sus rutas de cada parte backend/frontend
      // Se importa todo el coso de la base de datos (O sea la dirección, no sé por qué el coso lo ve como variable local xd)

      const connection = await import('./dataService.js');
      
      // Se crea la conexión
      const connectionInstance = await connection.default;

      // Aquí ya hago cualquier cosa con la base de datos, aquí el caso que puse Alumno y que lo muestre
      const [rows] = await connectionInstance.query('SELECT * FROM Alumno');
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Hubo un error al ejecutar la consulta');
    }
   });

app.get('/pong', async (req, res) => {
  try {
    const connection = await import('./dataService.js');

    const connectionInstance = await connection.default;

    const [rows] = await connectionInstance.query('SELECT * FROM Psicologo');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

// Ruta del login , vean bien esta parte del path, simplemente redirecciona al index.html o el perfil del psicólogo
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const connectionInstance = await connection;
    const [rowsAlumno] = await connectionInstance.query('SELECT * FROM Alumno WHERE correo = ? AND contrasena = ?', [correo, contrasena]);
    const [rowsPsicologo] = await connectionInstance.query('SELECT * FROM Psicologo WHERE correo = ? AND contrasena = ?', [correo, contrasena]);

    if (rowsAlumno.length > 0) {
      res.json({ success: true, role: 'Alumno' });
    } else if (rowsPsicologo.length > 0) {
      res.json({ success: true, role: 'Psicologo' });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

// Esto es para el perfil, pero se puede usar para las demás opciones
app.get('/alumno/:correo', async (req, res) => {
  try {
    const connectionInstance = await connection;
    const [rows] = await connectionInstance.query('SELECT * FROM Alumno WHERE correo = ?', [req.params.correo]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

app.get('/psicologo/:correo', async (req, res) => {
  try {
    const connectionInstance = await connection;
    const [rows] = await connectionInstance.query('SELECT nombre, correo, numero_telefono FROM Psicologo WHERE correo = ?', [req.params.correo]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

//Para las analíticas
app.get('/analiticas', async (req, res) => {
  try {
    const connectionInstance = await connection;

    const [cantAlumnos] = await connectionInstance.query('SELECT COUNT(*) AS cantAlumnos FROM Alumno');

    const [cantCitas] = await connectionInstance.query('SELECT COUNT(*) AS cantCitas FROM Cita WHERE asistencia IS NOT NULL');

    const [promedioGradoSatis] = await connectionInstance.query('SELECT AVG(grado_satis) AS promedioGradoSatis FROM Cita WHERE grado_satis IS NOT NULL');

    res.json({
      cantAlumnos: cantAlumnos[0].cantAlumnos,
      cantCitas: cantCitas[0].cantCitas,
      promedioGradoSatis: promedioGradoSatis[0].promedioGradoSatis
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

//falta limitar al mes
app.get('/motivosConsultaMes', async (req, res) => {
  try {
    const connectionInstance = await connection;

    const query = `
      SELECT m.nombre AS MotivoConsulta, COUNT(d.idMotivoConsulta) AS Cantidad
      FROM Motivo_consulta m
      LEFT JOIN Diagnostico d ON m.idMotivoConsulta = d.idMotivoConsulta
      GROUP BY m.nombre
      ORDER BY Cantidad DESC
    `;

    const [result] = await connectionInstance.query(query);
    const data = [['Motivos de Consulta', 'Cantidad de alumnos']].concat(
      result.map(row => [row.MotivoConsulta, row.Cantidad])
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

app.get('/motivosConsultaMesEn/:esc', async (req, res) => {
  try {
    const connectionInstance = await connection;

    const query = `
      SELECT m.nombre AS MotivoConsulta, COUNT(d.idMotivoConsulta) AS Cantidad
      FROM Motivo_consulta m
      LEFT JOIN Diagnostico d ON m.idMotivoConsulta = d.idMotivoConsulta
      LEFT JOIN Alumno a ON d.idAlumno = a.idAlumno
      WHERE a.escuela_prof LIKE ?
      GROUP BY m.nombre
      ORDER BY Cantidad DESC    
    `;

    const [result] = await connectionInstance.query(query, [`%${req.params.esc}%`]);
    const data = [['Motivos de Consulta', 'Cantidad de alumnos']].concat(
      result.map(row => [row.MotivoConsulta, row.Cantidad])
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error al ejecutar la consulta');
  }
});

app.listen(3000)
console.log('Servidor corriendo en el puerto 3000')
