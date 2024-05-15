import { Employee } from "./employee/resolvers";
import { User } from "./user/resolvers";

const customResolvers = [User, Employee];
export { customResolvers };