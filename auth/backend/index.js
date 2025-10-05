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
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

// Alle Folder für alle Nutzer (kein userId Filter mehr)
app.get("/folders", authMiddleware, async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      include: { todos: true },
      orderBy: { id: "asc" }
    });
    res.json(folders);
  } catch (e) {
    res.status(500).json({ error: "Fehler beim Laden" });
  }
});

// Einzelner Folder (kein userId Filter)
app.get("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const folder = await prisma.folder.findFirst({
      where: { id },
      include: { todos: true }
    });
    if (!folder) return res.status(404).json({ error: "Folder nicht gefunden" });
    res.json(folder);
  } catch (e) {
    res.status(500).json({ error: "Fehler beim Laden" });
  }
});

// Erstellen (userId bleibt gespeichert, aber Zugriff nicht eingeschränkt)
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

// Update ohne userId Einschränkung
app.put("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.folder.update({
      where: { id },
      data: { name: req.body.name, done: req.body.done }
    });
    res.json({ success: true, folder: result });
  } catch (e) {
    res.status(404).json({ error: "Folder nicht gefunden oder Update fehlgeschlagen" });
  }
});

// Löschen ohne userId Einschränkung (Todos werden vorher entfernt)
app.delete("/folders/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return res.status(404).json({ error: "Folder nicht gefunden" });

    await prisma.$transaction([
      prisma.todo.deleteMany({ where: { folderId: id } }),
      prisma.folder.delete({ where: { id } })
    ]);

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Folder konnte nicht gelöscht werden" });
  }
});

// Todos: Erstellung ohne userId Prüfung
app.post("/todos", authMiddleware, async (req, res) => {
  const { name, folderId } = req.body;
  try {
    const folder = await prisma.folder.findFirst({ where: { id: folderId } });
    if (!folder) return res.status(404).json({ error: "Folder nicht gefunden" });
    const todo = await prisma.todo.create({ data: { name, folderId } });
    res.json(todo);
  } catch (e) {
    res.status(400).json({ error: "Todo konnte nicht erstellt werden" });
  }
});

// Todo Update ohne userId Prüfung
app.put("/todos/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id } });
    if (!exists) return res.status(404).json({ error: "Todo nicht gefunden" });
    const updated = await prisma.todo.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: "Update fehlgeschlagen" });
  }
});

// Todo Löschen ohne userId Prüfung
app.delete("/todos/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id } });
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
