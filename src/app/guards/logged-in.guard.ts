import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.service.isLoggedIn().pipe(map(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']).finally();
        return false;
      }
      return true;
    }));
  }

}
