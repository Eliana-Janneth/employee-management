import prisma from '@/config/prisma';
import { formatDate } from '@/utils/formatDate';

/*
    Resolver para el tipo de dato Employee
    Se encarga de realizar las operaciones CRUD de los empleados
    - employees: Devuelve todos los empleados
    - employee: Devuelve un empleado por ID
    - getEmployeesByName: Devuelve empleados por nombre
    - getEmployeesByID: Devuelve empleados por ID
    - createEmployee: Crea un nuevo empleado
    - updateEmployee: Actualiza un empleado existente
    - deleteEmployee: Elimina un empleado existente
*/
const Employee = {
    Query: {
        employees: () => prisma.employee.findMany(),
        employee: async (_: any, { id }: { id: string }) => {
            const employee = await prisma.employee.findUnique({ where: { id }, include: { createdBy: true } });
            if (!employee) {
                throw new Error(`Employee with ID ${id} not found`);
            }
            return employee;
        },
        getEmployeesByName: (_: any, { name }: { name: string }) => prisma.employee.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                }
            }
        }),
        getEmployeesByID: (_: any, { id }: { id: string }) => prisma.employee.findMany({
            where: {
                id: {
                    contains: id,
                    mode: 'insensitive',
                }
            }
        }),
    },
    Employee: {
        createdBy: async (parent: any) => {
            const createdByUser = await prisma.user.findUnique({
                where: { id: parent.userId }, // Accede al userId del empleado para buscar el usuario correspondiente
            });
            if (!createdByUser) {
                throw new Error(`User with ID ${parent.userId} not found`);
            }
            return createdByUser;
        },
    },
    Mutation: {
        async createEmployee(_: any, { input }: { input: any }) {
            const employeeExists = await prisma.employee.findUnique({ where: { id: input.id } });
            if (employeeExists) {
                throw new Error(`Employee with ID ${input.id} already exists`);
            }
            const employee = await prisma.employee.create({
                data: {
                    id: input.id,
                    name: input.name,
                    baseSalary: input.baseSalary,
                    userId: input.userId,
                    email: input.email,
                    address: input.address,
                    phone: input.phone,
                    createdAt: formatDate(new Date()),
                }
            });
            return employee;
        },
        async updateEmployee(_: any, { input }: { input: any }) {
            const { id, ...updatedData } = input;
            const employeeExists = await prisma.employee.findUnique({ where: { id } });
            if (!employeeExists) {
                throw new Error(`Employee with ID ${id} not found`);
            }
            const employee = await prisma.employee.update({
                where: { id },
                data: updatedData,
            });
            return employee;
        },
        async deleteEmployee(_: any, { id }: { id: string }) {
            const employeeExists = await prisma.employee.findUnique({ where: { id } });
            if (!employeeExists) {
                throw new Error(`Employee with ID ${id} not found`);
            }
            const employee = await prisma.employee.delete({ where: { id } });
            return employee;
        },
    },
};

export { Employee };
