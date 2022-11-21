import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders} from "@angular/common/http";
import {FilterService} from "./filter.service";
import {Observable} from "rxjs";
import {Page} from "../interfaces/page";
import {Query} from "../interfaces/query";
import {map} from "rxjs/operators";

const routes = {
  search: (page: number, filter: string) =>
    `${environment.api_url}/queries?page=${page}${filter}`,
  findById: (id: string) =>
    `${environment.api_url}/queries/${id}`,
  patch: (id: string) =>
    `${environment.api_url}/queries/${id}`,
  create: () =>
    `${environment.api_url}/queries`,
  execute: (id: string) =>
    `${environment.api_url}/queries/${id}/execute`,
  download: (id: string) =>
    `${environment.api_url}/queries/${id}/download`,
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

  public execute(query: Query): Observable<any> {
    return this.http.post<any>(routes.execute(query.id), {});
  }

  public head(query: Query): Observable<HttpHeaders> {
    return this.http.head(routes.download(query.id), {
      observe: "response"
    }).pipe(map(response => {
      return response.headers;
    }));
  }

  public download(query: Query): Observable<any> {
    return this.http.get(routes.download(query.id), {
      responseType: "arraybuffer",
      observe: "events"
    }).pipe(map((http: HttpEvent<any>) => {
      if (http.type == HttpEventType.Response) {
        const headers = http.headers;
        let fileName;
        if (headers.has("Content-Disposition")) {
          const disposition = headers.get("Content-Disposition");
          const fileNameItem = disposition
            .split(";")
            .map(item => item.trim())
            .find(item => item.toLowerCase().startsWith("filename="));
          if (fileNameItem == null) {
            throw new Error(`Server didn't send a filename`);
          }
          fileName = fileNameItem.split("=")[1];
          if (fileName.startsWith('"')) {
            fileName = fileName.substring(1, fileName.length - 1);
          }
        } else {
          fileName = query.id + ".csv";
        }
        const contentType = headers.get("Content-Type");
        const blob = new Blob([http.body], {type: contentType});
        return {
          type: HttpEventType.Response,
          name: fileName,
          content: blob
        };
      }
      return http;
    }));
  }

}
