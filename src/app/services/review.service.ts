import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Review} from "../interfaces/review";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/reviews?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/reviews/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/reviews/${id}`,
  create: () =>
    `${environment.api_url}/reviews`
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient,
    private filters: FilterService) {
  }

  public search(page: number, filter?: any): Observable<Page<Review>> {
    const data = this.filters.toURL(filter);
    return this.http.get<Page<Review>>(routes.search(page, data));
  }

  public findById(id: string): Observable<Review> {
    return this.http.get<Review>(routes.findById(id));
  }

  public patch(id: string, body: any): Observable<Review> {
    return this.http.patch<Review>(routes.patch(id), body);
  }

  public create(body: any): Observable<Review> {
    return this.http.post<Review>(routes.create(), body);
  }

}
