const express = require('express');
const app = express();

app.use(express.json());   

const estudiantes = [
    {id: 1, name: 'John', age: 25, enroll: true},
    {id: 2 , name: 'Jane', age: 22, enroll: false},
    {id: 3, name: 'Bob', age: 30, enroll: true},
    {id: 4, name: 'Susan', age: 28, enroll: false},
    {id: 5, name: 'Peter', age: 20, enroll: true},
];

app.get('/', (req, res) => {
    res.send('Hola NodePapu');
    res.send('Como estas? :v');
});

app.get('/api/estudiantes', (req, res) => {
    res.send(estudiantes);
});

app.get('/api/estudiantes/:id', (req, res) => {
    const student = estudiantes.find(s => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    res.send(student);
});

app.post('/api/estudiantes', (req, res) => {
    const student = {
        id: estudiantes.length + 1,
        name: req.body.name,
        age: req.body.age,
        enroll: (req.body.enroll === 'true')
    };
    estudiantes.push(student);
    res.send(student);
});

app.delete('/api/estudiantes/:id', (req, res) => {
    const student = estudiantes.find(s => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    const index = estudiantes.indexOf(student);
    estudiantes.splice(index, 1);
    res.send(student);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}....`));
