import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StateService} from "./state-service";
import {User} from "../interfaces/user";
import {mergeMap, Observable, of, tap} from "rxjs";
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const routes = {
  login: `${environment.api_url}/login`,
  register: `${environment.api_url}/register`,
  self_user: `${environment.api_url}/users/@me`,
  change_password: `${environment.api_url}/users/change_password`
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends StateService<User> {

  constructor(private http: HttpClient) {
    super(undefined);
  }

  /**
   * Returns the token used for authorizing requests.
   */
  public getToken(): string | null {
    return this.getCookie('Session');
  }

  /**
   * Saves the new token.
   * @param token - Token
   */
  private setToken(token: any): void {
    this.setCookie('Session', token.code, 1);
  }

  /*
    Change password

  */
  private newPassword() {
    this.getUser();
  }

  /*
    Register new user
  
  */
  private newUser() {
    
  }

  /**
   * Authenticates the user with the backend.
   *
   * @param body Login details.
   */
  public login(body: { email: string, password: string }): Observable<any> {
    this.deleteSession();
    return this.http.post<any>(routes.login, body, httpOptions).pipe(tap(data => this.setToken(data)));
  }

  /**
   * Checks if a token exists and is valid.
   */
  public isLoggedIn(): Observable<boolean> {
    if (!this.getToken()) {
      return of(false);
    }
    return this.getUser().pipe(mergeMap(user => {
      if (user == undefined) {
        return this.http.get<User>(routes.self_user)
          .pipe(map(user => {
            this.setUser(user);
            return true;
          }));
      } else {
        return of(true);
      }
    }));
  }

  /**
   * Logs the user out.
   */
  public logout(): void {
    this.deleteSession();
    // Redirect to log-in page.
    location.href = '/login';
  }

  public deleteSession(): void {
    this.setState(undefined);
    this.setCookie('Session', null);
  }

  public setUser(user: User) {
    this.setState(user);
  }

  public getUser(): Observable<User> {
    return this.select(state => state);
  }

  private setCookie(name: string, value: string | null, days?: number): void {
    let expires;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '; expires=' + new Date().toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  private getCookie(name: string): string | null {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
}
