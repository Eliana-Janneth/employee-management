import { gql } from "apollo-server-micro";

const User = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    image: String
    role: String!
  }

  type Query {
    users: [User]!
    }
  
  type Mutation {
    updateRole(id: ID!, role: String!): User!
  }
    `;

export { User };