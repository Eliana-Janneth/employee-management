import { gql } from "apollo-server-micro";

const PerformanceEvaluation = gql`
    type PerformanceEvaluation {
        id: String
        createdBy: User
        employee: Employee
        userId: String!
        employeeId: String!
        createdAt: String!
        initialDate: String!
        finalDate: String!
        description: String!
        improvementOpportunities: String!
        calification: Int!
    }

    input NewPerformanceEvaluationInput {
        userId: String!
        employeeId: String!
        initialDate: String!
        finalDate: String!
        description: String!
        improvementOpportunities: String!
        calification: Int!
    }

    type Query {
        performanceEvaluationByEmployee(employeeId: String!, id: String!): PerformanceEvaluation!
        performanceEvaluationsByEmployee(employeeId: String!): [PerformanceEvaluation]!
        performanceEvaluationsByUser(userId: String!): [PerformanceEvaluation]!
    }

    type Mutation {
        createPerformanceEvaluation(input: NewPerformanceEvaluationInput!): PerformanceEvaluation!
        deletePerformanceEvaluation(id: String!): PerformanceEvaluation!
    }
`;

export { PerformanceEvaluation };