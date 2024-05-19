import { gql } from "apollo-server-micro";

export const CREATE_HOURS_WORKED = gql`
    mutation CreateHoursWorked($input: NewHoursWorkedInput!) {
        createHoursWorked(input: $input) {
            userId
            employeeId
            date
            hours
        }
    }
`;

export const UPDATE_HOURS_WORKED = gql`
    mutation UpdateHoursWorked($input: UpdateHoursWorkedInput!) {
        updateHoursWorked(input: $input) {
            id
            date
            hours
        }
    }
`;

export const DELETE_HOURS_WORKED = gql`
    mutation DeleteHoursWorked($id: String!) {
        deleteHoursWorked(id: $id) {
            id
        }
    }
`;