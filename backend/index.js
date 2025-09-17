import express from "express";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.post("/auth/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, username, password: hashed },
    });
    res.json({ message: "User created", user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

app.get("/folders", authMiddleware, async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id },
    include: { todos: true },
  });
  res.json(folders);
});

app.post("/folders", authMiddleware, async (req, res) => {
  const folder = await prisma.folder.create({
    data: { ...req.body, userId: req.user.id },
  });
  io.emit("folder:created", folder);
  res.json(folder);
});

app.put("/folders/:id", authMiddleware, async (req, res) => {
  const folder = await prisma.folder.updateMany({
    where: { id: Number(req.params.id), userId: req.user.id },
    data: req.body,
  });
  if (!folder.count) return res.status(403).json({ error: "Not allowed" });
  io.emit("folder:updated", req.body);
  res.json({ success: true });
});

app.delete("/folders/:id", authMiddleware, async (req, res) => {
  const folder = await prisma.folder.deleteMany({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!folder.count) return res.status(403).json({ error: "Not allowed" });
  io.emit("folder:deleted", Number(req.params.id));
  res.json({ success: true });
});

app.post("/todos", authMiddleware, async (req, res) => {
  const folder = await prisma.folder.findFirst({
    where: { id: req.body.folderId, userId: req.user.id },
  });
  if (!folder) return res.status(403).json({ error: "Not allowed" });
  const todo = await prisma.todo.create({ data: req.body });
  io.emit("todo:created", todo);
  res.json(todo);
});

app.put("/todos/:id", authMiddleware, async (req, res) => {
  const todo = await prisma.todo.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  io.emit("todo:updated", todo);
  res.json(todo);
});

app.delete("/todos/:id", authMiddleware, async (req, res) => {
  const todo = await prisma.todo.delete({
    where: { id: Number(req.params.id) },
  });
  io.emit("todo:deleted", todo.id);
  res.json(todo);
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
