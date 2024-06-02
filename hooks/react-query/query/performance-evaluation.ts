import { gql } from "apollo-server-micro";

export const GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE = gql`
    query PerformanceEvaluationByEmployee($employeeId: String!, $id: String!) {
        performanceEvaluationByEmployee(employeeId: $employeeId, id: $id) {
            initialDate
            finalDate
            calification
            description
            improvementOpportunities
            createdBy {
              name
            }
        }
    }
`;

export const GET_PERFORMANCE_EVALUATIONS_BY_EMPLOYEE = gql`
    query PerformanceEvaluationsByEmployee($employeeId: String!) {
        performanceEvaluationsByEmployee(employeeId: $employeeId) {
            id
            initialDate
            finalDate
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

    


