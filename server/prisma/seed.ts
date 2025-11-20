import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logger } from '../src/helpers';
import prisma from '../src/prisma_client';

// Cargar variables de entorno
dotenv.config();

async function main() {
  logger.info('Starting database seed...');

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_USER and ADMIN_PASSWORD must be set in environment variables',
    );
  }

  const username = process.env.ADMIN_USER;
  // Hashear la contraseña del usuario administrador
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

  // Crear el usuario administrador si no existe
  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      passwordHash,
    },
  });

  logger.info('Admin user created/verified');
  logger.info('Database seed completed successfully!');
}

main()
  .catch((e) => {
    logger.error(`Error during database seed: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
