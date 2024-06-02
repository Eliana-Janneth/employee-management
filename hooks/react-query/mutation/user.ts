import { gql } from "apollo-server-micro";

export const UPDATE_ROLE_USER = gql`
mutation UpdateRole($input: UserRoleInput!) {
  updateRole(input: $input) {
      id
      role
    }
}
`;