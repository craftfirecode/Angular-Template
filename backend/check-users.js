import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true
      }
    });
    
    console.log('📋 Alle User in der Datenbank:');
    console.log(users);
    
    if (users.length === 0) {
      console.log('❌ Keine User gefunden! Das ist wahrscheinlich das Problem.');
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Prüfen der User:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
