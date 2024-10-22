import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import loginRoute from "./auth/login.js";
import registerRoute from "./auth/register.js";
import db from "./db/db.js";

dotenv.config();

const port = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/login", loginRoute);
app.use("/register", registerRoute);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
