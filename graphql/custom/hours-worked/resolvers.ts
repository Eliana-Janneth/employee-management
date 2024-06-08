import prisma from '@/config/prisma';
import { formatDate } from '@/utils/formatDate';

/*
    Resolver para el tipo de dato HoursWorked
    Se encarga de realizar las operaciones CRUD de las horas trabajadas
    - hoursWorkedByEmployee: Devuelve las horas trabajadas por empleado
    - hoursWorkedByUser: Devuelve las horas trabajadas por usuario
    - getHoursWorkedByMonthAndEmployee: Devuelve las horas trabajadas por mes y empleado
    - countHoursWorkedByMonthAndEmployee: Devuelve la cantidad de horas trabajadas por mes y empleado
    - createHoursWorked: Crea un nuevo registro de horas trabajadas
    - updateHoursWorked: Actualiza un registro de horas trabajadas existente
    - deleteHoursWorked: Elimina un registro de horas trabajadas existente
*/
const HoursWorked = {
    Query: {
        hoursWorkedByEmployee: async (_: any, { employeeId }: { employeeId: string }) => {
            const hoursWorked = await prisma.hoursWorked.findMany({ where: { employeeId } });
            return hoursWorked;
        },
        hoursWorkedByUser: async (_: any, { userId }: { userId: string }) => {
            const hoursWorked = await prisma.hoursWorked.findMany({ where: { userId }, include: { employee: true } });
            if (!hoursWorked) {
                throw new Error(`Hours Worked with ID ${userId} not found`);
            }
            return hoursWorked;
        },
        getHoursWorkedByMonthAndEmployee: async (_: any, { yearMonth, employeeId }: { yearMonth: string, employeeId: string }) => {
            const hoursWorked = await prisma.hoursWorked.findMany({
                where: {
                    employeeId,
                    date: {
                        startsWith: yearMonth, 
                    },
                },
                orderBy: {
                    date: 'asc',
                  },
            });
            return hoursWorked;
        },
        countHoursWorkedByMonthAndEmployee: async (_: any, { yearMonth, employeeId }: { yearMonth: string, employeeId: string }): Promise<number> => {
            const hoursWorked = await prisma.hoursWorked.aggregate({
                where: {
                    employeeId,
                    date: {
                        startsWith: yearMonth,
                    },
                },
                _sum: {
                    hours: true,
                },
            });
            return hoursWorked._sum.hours || 0;
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