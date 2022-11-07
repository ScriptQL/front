import {Query} from "./query";
import {User} from "./user";

export interface Review {

  id: string,
  query: Query,
  user: User,
  role: string,
  comment: string,
  accepted: boolean

}
