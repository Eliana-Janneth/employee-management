import prisma from '@/config/prisma';

export const getUserID = async (email?: string | null) => {
    let user;
    if (email) {
        user = await prisma.user.findUnique({
            where: { email },
        });
    }
    if (user) {
        console.log("getUserID", user.id);
        return user.id;
    } else {
        return null;
    }
};