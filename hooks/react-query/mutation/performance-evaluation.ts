import { gql } from "apollo-server-micro";

export const CREATE_PERFORMANCE_EVALUATION = gql`
    mutation CreatePerformanceEvaluation($input: NewPerformanceEvaluationInput!) {
        createPerformanceEvaluation(input: $input) {
            userId
            employeeId
            description
            initialDate
            finalDate
            improvementOpportunities
            calification
        }
    }
`;

export const DELETE_PERFORMANCE_EVALUATION = gql`
    mutation DeletePerformanceEvaluation($id: String!) {
        deletePerformanceEvaluation(id: $id) {
            id
        }
    }
`;