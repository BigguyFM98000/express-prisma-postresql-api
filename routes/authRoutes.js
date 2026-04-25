import express from "express";
const router = express.Router();
import { register } from "../controllers/authController";

router.post("/register", register);

router.post("/", (req, res) => {
    res.json({message: "Post endpoint"});
});

export default router;