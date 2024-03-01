import express from "express";
const router = express.Router();
import con from "../../src/config/config";
import { databaseSchema, userSchema } from "../utils";
import { decrypt, encrypt } from "../dataCrypting";

// TODO: lisää try catch

router.get("/", (_req, res) => {
  con.query("SELECT * FROM users", function (err, results) {
    if (err) throw err;

    if (Array.isArray(results)) {
      const typeCheckingArray: string[] = [];

      results.forEach((r) => {
        const email: unknown = r.email;

        const validatedUser = databaseSchema.safeParse({
          email: email,
        });

        if (validatedUser.success) {
          // decrypt data
          const value = decrypt(validatedUser.data.email);
          typeCheckingArray.push(value);
        } else {
          console.log("There is no data or it is not correct.");
          res.send("Data is no valid.");
        }
      });
      res.json(typeCheckingArray);
    }
  });
});

router.post("/", (req, res) => {
  const sql = "INSERT INTO users (email) VALUES (?)";

  const email: unknown = req.body.email;
  const validatedUser = userSchema.safeParse({ email: email });

  if (validatedUser.success) {
    //encrypt data
    const encryptData = encrypt(validatedUser.data.email);

    con.query(sql, encryptData, function (err, result) {
      if (err) throw err;
      console.log("All users: ", result);

      res.status(200).send("user information is stored.");
    });
  } else {
    res.send("email is invalid.");
  }
});

export default router;
