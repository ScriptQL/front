import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {environment} from "../../environments/environment";
import {DataSource} from "../interfaces/data-source";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/connections?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/connections/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/connections/${id}`,
  create: () =>
    `${environment.api_url}/connections`
};

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(
    private http: HttpClient,
    private filters: FilterService) {
  }

  public search(page: number, filter?: any): Observable<Page<DataSource>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<DataSource>>(routes.search(page, data));
  }

  public findById(id: string): Observable<DataSource> {
    return this.http.get<DataSource>(routes.findById(id));
  }

  public patch(id: string, body: any): Observable<DataSource> {
    return this.http.patch<DataSource>(routes.patch(id), body);
  }

  public create(body: any): Observable<DataSource> {
    return this.http.post<DataSource>(routes.create(), body);
  }
}
