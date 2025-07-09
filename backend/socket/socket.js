import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// ✅ Use both localhost and your deployed frontend origin here
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // for local frontend development
      "https://chat-app-mern-gdsw.onrender.com" // deployed frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

// ✅ Helper to get a user's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// ✅ Socket connection handler
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // ✅ Broadcast online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
