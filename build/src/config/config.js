"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const con = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "KasV814?!4510",
});
const dropOldDatabase = "DROP DATABASE newsletter_sing_up;";
const createDatabase = "CREATE DATABASE newsletter_sing_up;";
const useDatabase = "USE newsletter_sing_up;";
const createTable = "CREATE TABLE users (id INT unsigned NOT NULL AUTO_INCREMENT, email VARCHAR(150) NOT NULL, PRIMARY KEY (id));";
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    con.query(dropOldDatabase, function (err, _result) {
        if (err)
            throw err;
    });
    con.query(createDatabase, function (err, _result) {
        if (err)
            throw err;
        console.log("Database created");
    });
    con.query(useDatabase, function (err, _result) {
        if (err)
            throw err;
    });
    con.query(createTable, function (err, _result) {
        if (err)
            throw err;
        console.log("Table created");
    });
});
exports.default = con;
