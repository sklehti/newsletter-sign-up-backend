"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userinfo_1 = __importDefault(require("./src/routers/userinfo"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
