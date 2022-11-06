import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Query} from "../interfaces/query";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/queries?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/queries/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/queries/${id}`,
  create: () =>
    `${environment.api_url}/queries`
};

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private http: HttpClient,
    private filters: FilterService) {
  }

  public search(page: number, filter?: any): Observable<Page<Query>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<Query>>(routes.search(page, data));
  }

  public findById(id: string): Observable<Query> {
    return this.http.get<Query>(routes.findById(id));
  }

  public patch(id: string, body: any): Observable<Query> {
    return this.http.patch<Query>(routes.patch(id), body);
  }

  public create(body: any): Observable<Query> {
    return this.http.post<Query>(routes.create(), body);
  }

}
