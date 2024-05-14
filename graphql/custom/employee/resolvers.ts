// Employee.ts

import { PrismaClient } from '@prisma/client';
import prisma from '@/config/prisma';

type EmployeeProps = {
    name: string;
    baseSalary: number;
};

const Employee = {
    Query: {
        employees: () => prisma.employee.findMany(),
        employee: async (_: any, { id }: { id: string }) => {
            const employee = await prisma.employee.findUnique({ where: { id }, include: { createdBy: true } });
            if (!employee) {
                throw new Error(`Employee with ID ${id} not found`);
            }
            return employee;
        }
    },
    Employee: {
        createdBy: async (parent: any) => {
            const createdByUser = await prisma.user.findUnique({
                where: { id: parent.userId }, // Accede al userId del empleado para buscar el usuario correspondiente
            });
            if (!createdByUser) {
                throw new Error(`User with ID ${parent.userId} not found`);
            }
            console.log(createdByUser);
            return createdByUser;
        },
    },
    Mutation: {
        async updateEmployee(_: any, { id, input }: any) {
            const { name, baseSalary } = input;
            const updatedEmployee = await prisma.employee.update({
                where: { id },
                data: {
                    name,
                    baseSalary,
                },
            });
            return updatedEmployee;
        },
        async deleteEmployee(_: any, { id }: any) {
            const deletedEmployee = await prisma.employee.delete({
                where: { id },
            });
            return deletedEmployee;
        },
    },
};

export { Employee };
