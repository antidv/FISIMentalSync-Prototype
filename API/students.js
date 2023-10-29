const express = require('express');
const app = express();
const port = 3000;

// Importar los datos de los usuarios
const users = require('./students.json');

app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});