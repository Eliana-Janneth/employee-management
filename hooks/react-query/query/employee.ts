import { gql } from "apollo-server-micro";

export const GET_EMPLOYEES = gql`
    query GetEmployees {
        employees {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        createdBy {
            name
          }
        }
    }
`;

export const GET_EMPLOYEE = gql`
    query GetEmployee($id: String!) {
        employee(id: $id) {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        createdBy {
            name
            email
        }
    }
`;

export const GET_EMPLOYEES_BY_NAME = gql`
    query GetEmployeesByName($name: String!) {
        getEmployeesByName(name: $name) {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        createdBy {
            name
            email
        }
    }
`;

export const GET_EMPLOYEES_BY_ID = gql`
    query GetEmployeesByID($id: String!) {
        getEmployeesByID(id: $id) {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        createdBy {
            name
            email
        }
    }
`;



