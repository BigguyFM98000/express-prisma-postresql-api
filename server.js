import express from "express"; // How to import a package
import {config} from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config();
connectDB();

const app = express(); // An instance of an express server
const PORT = 5001; // The port which the server will listen on

app.get("/hello", (req, res) => {
    res.json({message: "Hello, World!"});
})

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g. database connection errors)
process.on("unhandledRejection", async (err) => {
    console.error("Unhandled rejections: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
});

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception: ", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", (err) => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
});