const User = {
    Query: {
        users: async (_: any, __: any, { prisma }: any) => {
            const users = await prisma.user.findMany();
            return users;
        }
    },
    Mutation: {
        updateRole: async (_: any, { id, role }: { id: string, role: string }, { prisma }: any) => {
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