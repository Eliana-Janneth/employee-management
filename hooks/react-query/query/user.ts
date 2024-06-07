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

export const GET_USER = gql`
    query GetUser($email: String!) {
        user(email: $email) {
            id
        }
    }
`;