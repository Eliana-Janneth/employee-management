import { gql } from "apollo-server-micro";

export const UPDATE_ROLE_USER = gql`
mutation UpdateRole($updateRoleId: ID!, $role: String!) {
    updateRole(id: $updateRoleId, role: $role) {
      id
      role
    }
}
`;