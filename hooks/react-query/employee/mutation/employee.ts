import { gql } from "apollo-server-micro";

export const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($input: NewEmployeeInput!) {
        createEmployee(input: $input) {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        userId
        }
    }
`;