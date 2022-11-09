export interface User {
  id: string,
  name: string,
  email: string,
  access: "USER" | "EXECUTOR" | "ADMIN",
  status: string,
}
