import  express  from "express"

const app = express()

//Ruta de prueba para que vean cómo es la conexión con la base de datos con un query simple
//Ignoren el nombre de la ruta, le puse ping porque es como un ping a la base de datos

app.get('/ping', async (req, res) => {

    try {

    //LEAN: Esto es para que no apliquen a sus rutas de cada parte backend/fronted

    //Se importa todo el coso de la base de datos (O sea la dirección, no sé por qué el coso lo ve como variable local xd)
    const connection = await import('../services/dataService.js');
    //Se crea la conexión
    const connectionInstance = await connection.default;

    //Aquí ya hago cualquier cosa con la base de datos, aquí el caso que puse Alumno y que lo muestre
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
