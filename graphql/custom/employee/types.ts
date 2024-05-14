import { gql } from "apollo-server-micro";

const Employee = gql`
    type Employee {
        id: String!
        name: String!
        baseSalary: Int!
        userId: String!
        createdAt: String!
        updatedAt: String!
        email: String!
        address: String!
        phone: String!
        createdBy: User
    }
    
    input EmployeeInput {
        name: String!
        baseSalary: Int!
    }

    type Query {
        employees: [Employee]!
        employee(id: String!): Employee!
    }

    type Mutation {
        createEmployee(input: EmployeeInput!): Employee!
        updateEmployee(id: String!, input: EmployeeInput!): Employee!
        deleteEmployee(id: String!): Employee!
    }
`;

export { Employee };