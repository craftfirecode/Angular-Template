import express from "express";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const server = createServer(app);

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
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "360d" });
  res.json({ token });
});

app.get("/folders", authMiddleware, async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      include: { todos: true },
      orderBy: { id: "asc" }
    });
    res.json(folders);
  } catch (e) {
    res.status(500).json({ error: "Fehler beim Laden" });
  }
});

// Sicherer GET-Endpunkt für einzelnen Folder mit Todos
app.get("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const folder = await prisma.folder.findFirst({
      where: { id, userId: req.user.id },
      include: { todos: true }
    });
    if (!folder) return res.status(404).json({ error: "Folder nicht gefunden" });
    res.json(folder);
  } catch (e) {
    res.status(500).json({ error: "Fehler beim Laden" });
  }
});

app.post("/folders", authMiddleware, async (req, res) => {
  try {
    const folder = await prisma.folder.create({
      data: { name: req.body.name, userId: req.user.id }
    });
    res.json(folder);
  } catch (e) {
    res.status(400).json({ error: "Folder konnte nicht erstellt werden" });
  }
});

app.put("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.folder.updateMany({
      where: { id, userId: req.user.id },
      data: { name: req.body.name, done: req.body.done }
    });
    if (result.count === 0) return res.status(404).json({ error: "Folder nicht gefunden" });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: "Update fehlgeschlagen" });
  }
});

app.delete("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    // Versuche direkt zu löschen (Cascade sollte greifen)
    const deleted = await prisma.folder.deleteMany({ where: { id, userId: req.user.id } });
    if (deleted.count === 0) return res.status(404).json({ error: "Folder nicht gefunden" });
    res.json({ success: true });
  } catch (e) {
    // Fallback falls keine Cascade aktiv (z.B. alte DB-Struktur)
    try {
      await prisma.todo.deleteMany({ where: { folderId: id, folder: { userId: req.user.id } } });
      const deleted = await prisma.folder.deleteMany({ where: { id, userId: req.user.id } });
      if (deleted.count === 0) return res.status(404).json({ error: "Folder nicht gefunden" });
      res.json({ success: true, fallback: true });
    } catch (e2) {
      res.status(500).json({ error: "Löschen fehlgeschlagen" });
    }
  }
});

app.post("/todos", authMiddleware, async (req, res) => {
  const { name, folderId } = req.body;
  try {
    const folder = await prisma.folder.findFirst({ where: { id: folderId, userId: req.user.id } });
    if (!folder) return res.status(403).json({ error: "Kein Zugriff auf Folder" });
    const todo = await prisma.todo.create({ data: { name, folderId } });
    res.json(todo);
  } catch (e) {
    res.status(400).json({ error: "Todo konnte nicht erstellt werden" });
  }
});

app.put("/todos/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id, folder: { userId: req.user.id } } });
    if (!exists) return res.status(404).json({ error: "Todo nicht gefunden" });
    const updated = await prisma.todo.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: "Update fehlgeschlagen" });
  }
});

app.delete("/todos/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id, folder: { userId: req.user.id } } });
    if (!exists) return res.status(404).json({ error: "Todo nicht gefunden" });
    await prisma.todo.delete({ where: { id } });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: "Löschen fehlgeschlagen" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
