import { Role } from "./role";

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  access: "USER" | "EXECUTOR" | "ADMIN",
  status: string,
  roles: Array<Role> | Array<Number>
}
