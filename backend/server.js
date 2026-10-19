import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js"; // Express app and HTTP server

import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// CORS for local frontend (React/Vite dev servers)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required.");
}

// Do not accept requests until the database is ready.
await connectDB();

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});