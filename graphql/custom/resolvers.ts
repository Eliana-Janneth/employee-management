import { Employee } from "./employee/resolvers";
import { User } from "./user/resolvers";

const customResolvers = [Employee];
export { customResolvers };