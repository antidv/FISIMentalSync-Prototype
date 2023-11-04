require('dotenv').config()
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to PlanetScale!');
    
    const createTableQuery = `
        CREATE TABLE Usuarios (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(1000),
            PRIMARY KEY (id)
        )
    `;
    
    await connection.query(createTableQuery);
    console.log('Table created successfully');
    
    connection.end();
}

main();
