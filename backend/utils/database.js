import mysql from "mysql2";
import "dotenv/config"

const pool = mysql
  .createPool({
    host: "0.0.0.0",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "mewsic_sql",
    port: 3306,
  })
  .promise();

export default pool;
