const express = require('express');
const router = express.Router();
const connection = require('../services/dataService');


router.post('/login', (req, res) => {
 const { correo, contrasena } = req.body;

 connection.query(
   'SELECT * FROM Alumno WHERE correo = ? AND contrasena = ?',
   [correo, contrasena],
   (error, results) => {
     if (error) {
       return res.status(500).json({ error });
     }

     if (results.length > 0) {
       res.json({ message: 'Inicio de sesión exitoso' });
     } else {
       res.json({ message: 'Usuario o contraseña incorrectos' });
     }
   }
 );
});

module.exports = router;
