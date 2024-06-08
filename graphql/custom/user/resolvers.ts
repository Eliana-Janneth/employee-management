import prisma from '@/config/prisma';

/*
    Resolver para el tipo de dato User
    Se encarga de realizar las operaciones CRUD de los usuarios
    - users: Devuelve todos los usuarios
    - user: Devuelve un usuario por email
    - updateRole: Actualiza el rol de un usuario
*/
const User = {
    Query: {
        users: async () => {
            const users = await prisma.user.findMany();
            return users;
        },
        user: async (_: any, { email }: { email: string }) => {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return user;
        }
    },
    Mutation: {
        updateRole: async (_: any, { input }: { input: any }) => {
            const { id, role } = input;
            if (role !== 'ADMIN' && role !== 'USER') {
                throw new Error('Invalid role');
            }
            const user = await prisma.user.update({
                where: { id },
                data: { role }
            });
            return user;
        }
    }
};

export { User };