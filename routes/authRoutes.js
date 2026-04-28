import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/authController.js";

router.post("/register", register);
router.post("/logout", logout);
router.post("/login", login);

export default router;