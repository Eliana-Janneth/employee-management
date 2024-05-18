import { gql } from "apollo-server-micro";

export const CREATE_USER = gql`
    mutation User (
        $name: String!
        $email: String!
    ) {
        createUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;