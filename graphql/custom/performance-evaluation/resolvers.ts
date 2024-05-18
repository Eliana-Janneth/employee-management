import prisma from '@/config/prisma';
import { formatDate } from "@/utils/formatDate";

const PerformanceEvaluation = {
    Query: {
        performanceEvaluationsByEmployee: async (_: any, { employeeId }: { employeeId: string }) => {
            const performanceEvaluations = await prisma.performanceEvaluation.findMany({ where: { employeeId } });
            return performanceEvaluations;
        },
        performanceEvaluationsByUser: async (_: any, { userId }: { userId: string }) => {
            const performanceEvaluations = await prisma.performanceEvaluation.findMany({ where: { userId } });
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
            console.log(createdByUser);
            return createdByUser;
        },
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
                    calification: input.calification
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