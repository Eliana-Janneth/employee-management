import prisma from '@/config/prisma';

const User = {
    Query: {
        users: async () => {
            const users = await prisma.user.findMany();
            return users;
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