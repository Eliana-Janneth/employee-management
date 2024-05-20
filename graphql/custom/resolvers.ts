import { Employee } from "./employee/resolvers";
import { User } from "./user/resolvers";
import { PerformanceEvaluation } from "./performance-evaluation/resolvers";
import { HoursWorked } from "./hours-worked/resolvers";

const customResolvers = [User, Employee, PerformanceEvaluation, HoursWorked];
export { customResolvers };