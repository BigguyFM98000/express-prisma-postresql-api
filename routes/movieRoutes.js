import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "Get endpoint"});
});

router.post("/", (req, res) => {
    res.json({message: "Post endpoint"});
});

router.put("/", (req, res) => {
    res.json({message: "Put endpoint"});
});

router.delete("/", (req, res) => {
    res.json({message: "Delete endpoint"});
});

export default router;