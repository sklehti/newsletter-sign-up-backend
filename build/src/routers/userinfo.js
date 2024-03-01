"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const config_1 = __importDefault(require("../../src/config/config"));
const utils_1 = require("../utils");
const dataCrypting_1 = require("../dataCrypting");
// TODO: lisää try catch
// TODO: salaa ja purkaa (get käskyssä) käyttäjän tiedot
router.get("/", (_req, _res) => {
    config_1.default.query("SELECT * FROM users", function (err, results) {
        if (err)
            throw err;
        console.log(JSON.stringify(results[0].email), " tikkldjkfs", results);
        if (Array.isArray(results)) {
            results.forEach((r) => {
                console.log(JSON.stringify(r.email), "kjdlfsjskldjfkl");
                const email = JSON.stringify(r.email);
                const validatedUser = utils_1.userSchema.safeParse({
                    email: email,
                });
                if (validatedUser.success) {
                    /*  const decryptText = decrypt(validatedUser.data.text);
                  res.json(decryptText); */
                    console.log("jee");
                }
                else {
                    console.log("There is no data or it is not correct.");
                }
            });
        }
        // res.json(result);
    });
});
router.post("/", (req, res) => {
    const sql = "INSERT INTO users (email) VALUES (?)";
    const email = req.body.email;
    const validatedUser = utils_1.userSchema.safeParse({ email: email });
    console.log("User data is valid:", validatedUser);
    if (validatedUser.success) {
        //encrypt data
        const encryptData = (0, dataCrypting_1.encrypt)(validatedUser.data.email);
        config_1.default.query(sql, encryptData, function (err, result) {
            if (err)
                throw err;
            console.log("All users: ", result);
            res.status(200).send("user information is stored.");
        });
    }
    else {
        res.send("email is invalid.");
    }
});
exports.default = router;
