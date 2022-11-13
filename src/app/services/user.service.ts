import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/users?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/users/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/users/${id}`,
  create: () =>
    `${environment.api_url}/register`,
  editPassword: () =>  
    `${environment.api_url}/users/newPassword`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private filters: FilterService) {
  }

  public search(page: number, filter?: any): Observable<Page<User>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<User>>(routes.search(page, data));
  }

  public findById(id: string): Observable<User> {
    return this.http.get<User>(routes.findById(id));
  }

  public patch(id: string, body: any): Observable<User> {
    return this.http.patch<User>(routes.patch(id), body);
  }
  
  public newPassword(id: string, body: any): Observable<User> {
    return this.http.patch<User>(routes.editPassword(), body);
  }

  public create(body: any): Observable<User> {
    return this.http.post<User>(routes.create(), body);
  }

}
