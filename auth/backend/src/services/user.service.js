import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcrypt';

export async function getUserByUsernameAndPassword(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return user;
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
