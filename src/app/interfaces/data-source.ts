export interface DataSource {

  id: string,
  name: string,
  database: string,
  host: string,
  port: number,
  username: string,
  driver: "POSTGRES" | "MYSQL"

}
