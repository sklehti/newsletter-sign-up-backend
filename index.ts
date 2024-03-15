import express from "express";
import cors from "cors";

import usersInfo from "./src/routers/userinfo";

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

// TODO: fix this eslint error!
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors(options)
);

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
