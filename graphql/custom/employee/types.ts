import { gql } from "apollo-server-micro";

const Employee = gql`
    type Employee {
        id: String!
        name: String!
        baseSalary: Int!
        userId: String!
        createdAt: String!
        updatedAt: String
        email: String!
        address: String!
        phone: String!
        createdBy: User
    }
    
    input NewEmployeeInput {
        id: String!
        name: String!
        baseSalary: Int!
        userId: String!
        email: String!
        address: String!
        phone: String!
    }

    input UpdateEmployeeInput {
        id: String!
        name: String
        baseSalary: Int
        email: String
        address: String
        phone: String
    }

    type Query {
        employees: [Employee]!
        employee(id: String!): Employee!
        getEmployeesByName(name: String!): [Employee]!
        getEmployeesByID(id: String!): [Employee]!
    }

    type Mutation {
        createEmployee(input: NewEmployeeInput!): Employee!
        updateEmployee(input: UpdateEmployeeInput!): Employee!
        deleteEmployee(id: String!): Employee!
    }
`;

export { Employee };