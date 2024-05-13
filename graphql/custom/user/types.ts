import { gql } from "apollo-server-micro";

const User = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]!
    }
    `;

export { User };