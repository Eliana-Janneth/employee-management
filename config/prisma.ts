import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient;
}

/*
    Configuración de Prisma para realizar operaciones CRUD en la base de datos.
*/
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}
export default prisma;