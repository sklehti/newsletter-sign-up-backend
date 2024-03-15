"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const config_1 = __importDefault(require("../../src/config/config"));
const utils_1 = require("../utils");
const dataCrypting_1 = require("../dataCrypting");
router.get("/", (_req, res) => {
    config_1.default.query("SELECT * FROM users", function (err, results) {
        if (err) {
            res.status(500).send({ message: err });
        }
        if (Array.isArray(results)) {
            const typeCheckingArray = [];
            results.forEach((r) => {
                const email = r.email;
                const validatedUser = utils_1.databaseSchema.safeParse({
                    email: email,
                });
                if (validatedUser.success) {
                    // decrypt data
                    const value = (0, dataCrypting_1.decrypt)(validatedUser.data.email);
                    typeCheckingArray.push(value);
                }
                else {
                    console.log("There is no data or it is not correct.");
                    res.status(500).send("Data is no valid.");
                }
            });
            res.json(typeCheckingArray);
        }
    });
});
router.post("/", (req, res) => {
    const sql = "INSERT INTO users (email) VALUES (?)";
    const email = req.body.email;
    const validatedUser = utils_1.userSchema.safeParse({ email: email });
    if (validatedUser.success) {
        //encrypt data
        const encryptData = (0, dataCrypting_1.encrypt)(validatedUser.data.email);
        console.log(encryptData);
        config_1.default.query(sql, encryptData, function (err, result) {
            if (err) {
                res.status(500).send({ message: err });
            }
            console.log("All users: ", result);
            res.status(200).send("user information is stored.");
        });
    }
    else {
        res.status(500).send("Data is invalid.");
    }
});
exports.default = router;
