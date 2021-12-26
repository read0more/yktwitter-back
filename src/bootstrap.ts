import dotenv from "dotenv";
import { createConnection, Connection } from "mysql";

dotenv.config();

declare global {
  var connection: Connection;
}

global.connection = createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    throw Error("DB connection error");
  }

  console.log("connected");
});