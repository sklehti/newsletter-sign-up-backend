import express from "express";
import usersInfo from "./src/routers/userinfo";

const app = express();
app.use(express.json());
/* const router = express.Router();
app.use(router); */

const port = 3001;

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.use("/userInfo", usersInfo);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
