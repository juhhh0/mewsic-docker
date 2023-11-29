import mysql from "mysql2";
import "dotenv/config"

const pool = mysql
  .createPool({
    host: "0.0.0.0",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
    port: 3306,
  })
  .promise();

export default pool;
