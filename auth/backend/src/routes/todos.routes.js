import { Router } from 'express';
import { prisma } from '../utils/prisma.js';
import { verifyAccess } from '../middleware/verifyAccessToken.js';

const router = Router();

// Todos: Erstellung ohne userId Prüfung
router.post('/', verifyAccess, async (req, res) => {
  const { name, folderId } = req.body;
  const userId = Number(req.user.sub);
  if (!Number.isInteger(userId)) return res.status(401).json({ error: 'Ungültiger Benutzer' });

  try {
    const folder = await prisma.folder.findFirst({ where: { id: folderId } });
    if (!folder) return res.status(404).json({ error: 'Folder nicht gefunden' });
    // Prüfen, ob der Folder dem eingeloggten User gehört
    if (folder.userId !== userId) return res.status(403).json({ error: 'Keine Berechtigung für diesen Folder' });

    const todo = await prisma.todo.create({ data: { name, folderId, userId } });
    res.json(todo);
  } catch (e) {
    res.status(400).json({ error: 'Todo konnte nicht erstellt werden' });
  }
});

router.put('/:id', verifyAccess, async (req, res) => {
  const id = Number(req.params.id);
  const userId = Number(req.user.sub);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Ungültige ID' });
  if (!Number.isInteger(userId)) return res.status(401).json({ error: 'Ungültiger Benutzer' });

  try {
    // Ownership prüfen
    const exists = await prisma.todo.findFirst({ where: { id, userId } });
    if (!exists) return res.status(404).json({ error: 'Todo nicht gefunden oder keine Berechtigung' });

    // Verhindere, dass userId über das Update geändert wird
    const updateData = { ...req.body };
    delete updateData.userId;
    delete updateData.id;

    // Falls folderId geändert wird, prüfen wir, ob der neue Folder zum User gehört
    if (updateData.folderId) {
      const newFolder = await prisma.folder.findFirst({ where: { id: updateData.folderId } });
      if (!newFolder) return res.status(404).json({ error: 'Neuer Folder nicht gefunden' });
      if (newFolder.userId !== userId) return res.status(403).json({ error: 'Keine Berechtigung für den neuen Folder' });
    }

    const updated = await prisma.todo.update({ where: { id }, data: updateData });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Update fehlgeschlagen' });
  }
});


router.delete('/:id', verifyAccess, async (req, res) => {
  const id = Number(req.params.id);
  const userId = Number(req.user.sub);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Ungültige ID' });
  if (!Number.isInteger(userId)) return res.status(401).json({ error: 'Ungültiger Benutzer' });

  try {
    const exists = await prisma.todo.findFirst({ where: { id, userId } });
    if (!exists) return res.status(404).json({ error: 'Todo nicht gefunden oder keine Berechtigung' });
    await prisma.todo.delete({ where: { id } });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: 'Löschen fehlgeschlagen' });
  }
});

export default router;
