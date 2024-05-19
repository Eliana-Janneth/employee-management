import { gql } from "apollo-server-micro";

export const GET_HOURS_WORKED_BY_EMPLOYEE = gql`
    query HoursWorkedByEmployee($employeeId: String!) {
        hoursWorkedByEmployee(employeeId: $employeeId) {
            id
            userId
            employeeId
            date
            hours
            createdAt
            createdBy {
                name
            }
        }
    }
`;

export const GET_HOURS_WORKED_BY_USER = gql`
    query HoursWorkedByUser($userId: String!) {
        hoursWorkedByUser(userId: $userId) {
            id
            userId
            employeeId
            date
            hours
            createdAt
            createdBy {
                name
            }
        }
    }
`;