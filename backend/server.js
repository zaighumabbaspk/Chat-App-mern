import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
// const app = express();

app.use(express.json()); // <--- This fixes req.body undefined issue
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
connectDB();

// Middleware routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//test routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
