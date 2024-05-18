import { Employee } from "./employee/resolvers";
import { User } from "./user/resolvers";
import { PerformanceEvaluation } from "./performance-evaluation/resolvers";

const customResolvers = [User, Employee, PerformanceEvaluation];
export { customResolvers };