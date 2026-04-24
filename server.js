import express from "express"; // How to import a package
import {config} from "dotenv";

// Import routes
import movieRoutes from "./routes/movieRoutes.js";

config();

const app = express(); // An instance of an express server
const PORT = 5001; // The port which the server will listen on

app.get("/hello", (req, res) => {
    res.json({message: "Hello, World!"});
})

// API Routes
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})