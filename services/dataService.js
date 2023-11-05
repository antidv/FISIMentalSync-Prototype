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
CREATE TABLE Diagnosito (
  idDiagnostico INT NOT NULL AUTO_INCREMENT,
  idAlumno INT NOT NULL,
  idPatologia INT NOT NULL,
  descripcion VARCHAR(1000),
  FOREIGN KEY (idAlumno) REFERENCES Alumno(idAlumno) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idPatologia) REFERENCES Patologia(idPatologia) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (idDiagnostico)
`;

connection.query(createTableQuery, function (err, results, fields) {
    if (err) throw err;
    console.log('Tabla creada exitosamente');
});


connection.end()