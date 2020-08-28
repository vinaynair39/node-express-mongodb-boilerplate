import express from "express";
import { register, login } from "../controller/auth.js";
import fileParser from "express-multipart-file-parser";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
export default router;
