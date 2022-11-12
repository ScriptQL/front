import { User } from './../interfaces/user';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Role} from "../interfaces/role";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/roles?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/roles/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/roles/${id}`,
  create: () =>
    `${environment.api_url}/roles`,
  delete: (id: string) => 
    `${environment.api_url}/roles/${id}`,
  findUsersByRoleId: (id: string, page: number, filter: string) =>
    `${environment.api_url}/roles/${id}/users?page=${page}${filter}`
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private filters: FilterService) {
  }

  public search(page: number, filter?: any): Observable<Page<Role>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<Role>>(routes.search(page, data));
  }

  public findById(id: string): Observable<Role> {
    return this.http.get<Role>(routes.findById(id));
  }

  public patch(id: string, body: any): Observable<Role> {
    return this.http.patch<Role>(routes.patch(id), body);
  }

  public create(body: any): Observable<Role> {
    return this.http.post<Role>(routes.create(), body);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(routes.delete(id));
  }

  public findUsersByRoleId(id: string, page: number, filter?: any): Observable<Page<User>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<User>>(routes.findUsersByRoleId(id, page, data));
  }

}
