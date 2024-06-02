import prisma from '@/config/prisma';
import { formatDate } from "@/utils/formatDate";

const PerformanceEvaluation = {
    Query: {
        performanceEvaluationsByEmployee: async (_: any, { employeeId }: { employeeId: string }) => {
            const performanceEvaluations = await prisma.performanceEvaluation.findMany({ where: { employeeId } });
            return performanceEvaluations;
        },
        performanceEvaluationByEmployee: async (_: any, { employeeId, id }: { employeeId: string, id: string }) => {
            const performanceEvaluation = await prisma.performanceEvaluation.findUnique({ where: { id } });
            if (!performanceEvaluation) {
                throw new Error(`Performance Evaluation with ID ${id} not found`);
            }
            if (performanceEvaluation.employeeId !== employeeId) {
                throw new Error(`Performance Evaluation with ID ${id} not found for employee with ID ${employeeId}`);
            }
            return performanceEvaluation;
        },
        performanceEvaluationsByUser: async (_: any, { userId }: { userId: string }) => {
            const performanceEvaluations = await prisma.performanceEvaluation.findMany({ where: { userId }, include: { employee: true } });
            return performanceEvaluations;
        }
    },
    PerformanceEvaluation: {
        createdBy: async (parent: any) => {
            const createdByUser = await prisma.user.findUnique({
                where: { id: parent.userId }, // Accede al userId del empleado para buscar el usuario correspondiente
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
        async createPerformanceEvaluation(_: any, { input }: { input: any }) {
            const performanceEvaluation = await prisma.performanceEvaluation.create({
                data: {
                    userId: input.userId,
                    employeeId: input.employeeId,
                    createdAt: formatDate(new Date()),
                    initialDate: input.initialDate,
                    finalDate: input.finalDate,
                    improvementOpportunities: input.improvementOpportunities,
                    calification: input.calification,
                    description: input.description
                }
            });
            return performanceEvaluation;
        },
        async deletePerformanceEvaluation(_: any, { id }: { id: string }) {
            const performanceEvaluationExists = await prisma.performanceEvaluation.findUnique({ where: { id } });
            if (!performanceEvaluationExists) {
                throw new Error(`Performance Evaluation with ID ${id} not found`);
            }
            const performanceEvaluation = await prisma.performanceEvaluation.delete({ where: { id } });
            return performanceEvaluation;
        }
    }
}

export { PerformanceEvaluation };