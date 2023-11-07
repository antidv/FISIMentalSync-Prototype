require('dotenv').config()

const mysql = require('mysql2')

const connection = mysql.createConnection(process.env.DATABASE_URL)

// simple query
connection.query('show tables', function (err, results, fields) {
  console.log(results) 
  console.log(fields) 
})




connection.end()