import {User} from "./user";
import {DataSource} from "./data-source";

export interface Query {

  id: string,
  requester: User,

  connection: DataSource,

  query: string,
  title: string,
  description: string,
  status: "WAITING_REVIEW" | "APPROVED" | "REJECTED" | "EXECUTING" | "DONE"

}
