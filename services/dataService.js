require('dotenv').config()

const mysql = require('mysql2')

const connection = mysql.createConnection(process.env.DATABASE_URL)

// simple query
connection.query('show tables', function (err, results, fields) {
  console.log(results) 
  console.log(fields) 
})

// Example with placeholders
const createTableQuery = `
/*Ya estan todas las tablas Bv*/`;

connection.query(createTableQuery, function (err, results, fields) {
    if (err) throw err;
    console.log('Tabla creada exitosamente');
});


connection.end()