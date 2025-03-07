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

export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($input: UpdateEmployeeInput!) {
        updateEmployee(input: $input) {
        baseSalary
        email
        address
        phone
        }
    }
`;

export const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($id: String!) {
        deleteEmployee(id: $id) {
        id
        }
    }
`;