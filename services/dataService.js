import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function createConnection() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  return connection;
 }
 
 export default createConnection();