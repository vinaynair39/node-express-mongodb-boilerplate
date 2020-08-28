import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import usersRouter from "./routes/users.js";

const app = express();
const __dirname = path.resolve();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(path.join(__dirname, "../public"));
app.use("/images", express.static(__dirname + "/public/images"));

//=======================
// ALLOW-CORS
//=======================
// For development

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	next();
});

app.use("/api/user", usersRouter);

export default app;
