import  express  from "express"

const app = express()

app.get('/estudiantes', (req, res) => res.send('Obteniendo estudiantes'))

app.post('/estudiantes', (req, res) => res.send('Creando estudiantes'))


app.listen(3000)
console.log('Servidor corriendo en el puerto 3000')
