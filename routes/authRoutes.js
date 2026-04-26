import express from "express";
const router = express.Router();
import { register } from "../controllers/authController.js";

router.post("/register", register);

router.post("/", (req, res) => {
    res.json({message: "Post endpoint"});
});

export default router;