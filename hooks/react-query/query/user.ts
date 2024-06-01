import { gql } from "apollo-server-micro";

export const GET_USERS = gql`
    query Users {
        users {
            id
            name
            email
            image
            role
            createdAt
        }
    }
`;