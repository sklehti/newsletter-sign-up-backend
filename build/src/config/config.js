"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const con = mysql_1.default.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
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
