import { gql } from "apollo-server-micro";

const HoursWorked = gql`
    type HoursWorked {
        id: String!
        employeeId: String!
        userId: String!
        date: String!
        hours: Int!
        createdAt: String!
        updatedAt: String
        createdBy: User
        employee: Employee
    }
    
    input NewHoursWorkedInput {
        userId: String!
        employeeId: String!
        date: String!
        hours: Int!
    }

    input UpdateHoursWorkedInput {
        id: String!
        date: String
        hours: Int
    }

    type Query {
        hoursWorkedByEmployee(employeeId: String!): [HoursWorked]!
        hoursWorkedByUser(userId: String!): [HoursWorked]!
    }

    type Mutation {
        createHoursWorked(input: NewHoursWorkedInput!): HoursWorked!
        updateHoursWorked(input: UpdateHoursWorkedInput!): HoursWorked!
        deleteHoursWorked(id: String!): HoursWorked!
    }
`;

export { HoursWorked };