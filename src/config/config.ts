import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
const dropOldDatabase = "DROP DATABASE newsletter_sing_up;";
const createDatabase = "CREATE DATABASE newsletter_sing_up;";
const useDatabase = "USE newsletter_sing_up;";
const createTable =
  "CREATE TABLE users (id INT unsigned NOT NULL AUTO_INCREMENT, email VARCHAR(150) NOT NULL, PRIMARY KEY (id));";

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(dropOldDatabase, function (err, _result) {
    if (err) throw err;
  });

  con.query(createDatabase, function (err, _result) {
    if (err) throw err;
    console.log("Database created");
  });

  con.query(useDatabase, function (err, _result) {
    if (err) throw err;
  });

  con.query(createTable, function (err, _result) {
    if (err) throw err;
    console.log("Table created");
  });
});

export default con;
