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
            console.log("al menos estoy");
            console.log('input', input);
            const { id, role } = input;
            console.log('resolvers');
            console.log('id', id);
            console.log('role', role);
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