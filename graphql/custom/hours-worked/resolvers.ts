import prisma from '@/config/prisma';
import { formatDate } from '@/utils/formatDate';

const HoursWorked = {
    Query: {
        hoursWorkedByEmployee: async (_: any, { employeeId }: { employeeId: string }) => {
            const hoursWorked = await prisma.hoursWorked.findMany({ where: { employeeId } });
            return hoursWorked;
        },
        hoursWorkedByUser: async (_: any, { userId }: { userId: string }) => {
            const hoursWorked = await prisma.hoursWorked.findMany({ where: { userId } , include: { employee: true }});
            if (!hoursWorked) {
                throw new Error(`Hours Worked with ID ${userId} not found`);
            }
            return hoursWorked;
        }
    },
    HoursWorked: {
        createdBy: async (parent: any) => {
            const createdByUser = await prisma.user.findUnique({
                where: { id: parent.userId }, 
            });
            if (!createdByUser) {
                throw new Error(`User with ID ${parent.userId} not found`);
            }
            return createdByUser;
        },
        employee: async (parent: any) => {
            const employee = await prisma.employee.findUnique({
                where: { id: parent.employeeId }, 
            });
            if (!employee) {
                throw new Error(`Employee with ID ${parent.employeeId} not found`);
            }
            return employee;
        }
    },
    Mutation: {
        async createHoursWorked(_: any, { input }: { input: any }) {
            const hoursWorked = await prisma.hoursWorked.create({
                data: {
                    userId: input.userId,
                    employeeId: input.employeeId,
                    date: input.date,
                    hours: input.hours,
                    createdAt: formatDate(new Date())
                }
            });
            return hoursWorked;
        },
        async updateHoursWorked(_: any, { input }: { input: any }) {
            const hoursWorkedExists = await prisma.hoursWorked.findUnique({ where: { id: input.id } });
            if (!hoursWorkedExists) {
                throw new Error(`Hours Worked with ID ${input.id} not found`);
            }
            const hoursWorked = await prisma.hoursWorked.update({
                where: { id: input.id },
                data: {
                    date: input.date,
                    hours: input.hours
                }
            });
            return hoursWorked;
        },
        async deleteHoursWorked(_: any, { id }: { id: string }) {
            const hoursWorkedExists = await prisma.hoursWorked.findUnique({ where: { id } });
            if (!hoursWorkedExists) {
                throw new Error(`Hours Worked with ID ${id} not found`);
            }
            const hoursWorked = await prisma.hoursWorked.delete({ where: { id } });
            return hoursWorked;
        }
    }
}

export { HoursWorked };