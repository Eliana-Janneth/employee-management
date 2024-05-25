import { gql } from "apollo-server-micro";

export const GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE = gql`
    query PerformanceEvaluationByEmployee($employeeId: String!) {
        performanceEvaluationByEmployee(employeeId: $employeeId) {
            id
            userId
            employeeId
            createdAt
            initialDate
            finalDate
            improvementOpportunities
            calification
            createdBy {
                name
              }
        }
    }
`;

export const GET_PERFORMANCE_EVALUATIONS_BY_USER = gql`
    query PerformanceEvaluationsByUser($userId: String!) {
        performanceEvaluationsByUser(userId: $userId) {
            id
            userId
            employeeId
            createdAt
            initialDate
            finalDate
            improvementOpportunities
            calification
            createdBy {
                name
              }
        }
    }
`;

    


