const express = require('express');
const app = express();

app.use(express.json());   

const students = [
    {id: 1, name: 'John', age: 25, enroll: true},
    {id: 2, name: 'Jane', age: 22, enroll: false},
    {id: 3, name: 'Bob', age: 30, enroll: true},
    {id: 4, name: 'Susan', age: 28, enroll: false},
    {id: 5, name: 'Peter', age: 20, enroll: true},
    ];

app.get('/', (req, res) => {
    res.send('Hola NodePapu');
    res.send('Como estas? :v');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        enroll: (req.body.enroll === 'true')
    };
    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}....`));
