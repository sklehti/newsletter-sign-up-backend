"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userinfo_1 = __importDefault(require("./src/routers/userinfo"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = ["http://localhost:3000"];
// TODO: fix this eslint error!
const options = {
    origin: allowedOrigins,
};
app.use(
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
(0, cors_1.default)(options));
/* const router = express.Router();
app.use(router); */
const port = 3001;
app.get("/", (_req, res) => {
    res.send("hello world");
});
app.use("/userInfo", userinfo_1.default);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
