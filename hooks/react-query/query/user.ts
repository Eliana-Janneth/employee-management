import { gql } from "apollo-server-micro";

export const GET_USERS = gql`
    query GetUsers {
        users {
            id
            name
            email
            image
            role
        }
    }
`;