import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class FreeGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isAuthenticated()) {
      this.authService.isLoggedIn.next(true);
      this.router.navigate(['/']).then(r => console.log(r));
      return false;
    }
    return true;
  }
}
