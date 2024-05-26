import { gql } from "apollo-server-micro";

export const GET_HOURS_WORKED_BY_EMPLOYEE = gql`
    query hoursWorkedByEmployee($employeeId: String!) {
        hoursWorkedByEmployee(employeeId: $employeeId) {
            id
            userId
            employeeId
            date
            hours
            createdAt
            createdBy {
                name
            }
        }
    }
`;

export const GET_HOURS_WORKED_BY_USER = gql`
    query hoursWorkedByUser($userId: String!) {
        hoursWorkedByUser(userId: $userId) {
            id
            userId
            employeeId
            date
            hours
            createdAt
            employee {
                name
            }
        }
    }
`;

export const COUNT_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE = gql`
query CountHoursWorkedByMonthAndEmployee($yearMonth: String!, $employeeId: String!) {
    countHoursWorkedByMonthAndEmployee(month: $yearMonth, employeeId: $employeeId)
  }
`;

export const GET_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE = gql`
query GetHoursWorkedByMonthAndEmployee($yearMonth: String!, $employeeId: String!) {
    getHoursWorkedByMonthAndEmployee(yearMonth: $yearMonth, employeeId: $employeeId) {
      hours
      date
      createdBy {
        name
      }
    }
  }
`;