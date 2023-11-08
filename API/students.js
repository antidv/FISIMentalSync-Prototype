//Ignoren este documento, ya pronto se va a eliminar

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const students = require('./students.json');

app.get('/students', (req, res) => {
  res.json(students.usuarios);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});