import {User} from "./user";

export interface Query {

  id: string,
  requester: User,

  // connection

  query: string,
  description: string,
  status: "WAITING_REVIEW" | "APPROVED" | "REJECTED" | "EXECUTING" | "DONE"

}
