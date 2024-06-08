import { gql } from "apollo-server-micro";

const User = gql`
  type User {
    id: String!
    name: String!
    email: String!
    image: String
    role: String!
  }

  type Query {
    users: [User]!
    user(email: String!): User!
    }

  input UserRoleInput {
    id: String!
    role: String!
  }
  
  type Mutation {
    updateRole(input: UserRoleInput!): User!
  }
    `;

export { User };