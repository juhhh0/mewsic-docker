import mysql from "mysql2";
import "dotenv/config"

const pool = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
  })
  .promise();

export default pool;
