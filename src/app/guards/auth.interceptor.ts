import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isPaused = false;
  private pause: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private service: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let request = req;
    const token = this.service.getToken();
    if (token != null) {
      request = AuthInterceptor.addHeader(req, token);
    }
    return next.handle(request).pipe(catchError(error => {
      // if (token
      //   && error instanceof HttpErrorResponse
      //   && error.status === 401
      //   && !request.url.includes('/login')) {
      //   return this.handle401Error(request, next, token);
      // }
      return throwError(error);
    }));
  }

  private static addHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }

}
