import cors from "cors";
import express from "express";
import userRoutes from "./server.js"
app.use(cors());
app.use(express.json());
app.post("/api", userRoutes)
app.listen(5000, () => console.log("Server running on http://localhost:5000"));