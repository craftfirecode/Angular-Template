import { Router } from 'express';
import { prisma } from '../utils/prisma.js';
import { verifyAccess } from '../middleware/verifyAccessToken.js';

const router = Router();

// Todos: Erstellung ohne userId Prüfung
router.post('/', verifyAccess, async (req, res) => {
  const { name, folderId } = req.body;
  try {
    const folder = await prisma.folder.findFirst({ where: { id: folderId } });
    if (!folder) return res.status(404).json({ error: 'Folder nicht gefunden' });
    const todo = await prisma.todo.create({ data: { name, folderId } });
    res.json(todo);
  } catch (e) {
    res.status(400).json({ error: 'Todo konnte nicht erstellt werden' });
  }
});

// Todo Update ohne userId Prüfung
router.put('/:id', verifyAccess, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id } });
    if (!exists) return res.status(404).json({ error: 'Todo nicht gefunden' });
    const updated = await prisma.todo.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Update fehlgeschlagen' });
  }
});

// Todo Löschen ohne userId Prüfung
router.delete('/:id', verifyAccess, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const exists = await prisma.todo.findFirst({ where: { id } });
    if (!exists) return res.status(404).json({ error: 'Todo nicht gefunden' });
    await prisma.todo.delete({ where: { id } });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: 'Löschen fehlgeschlagen' });
  }
});

export default router;
