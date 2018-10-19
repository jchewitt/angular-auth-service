import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from "rxjs";
import { tap, map } from "rxjs/internal/operators";
import { StorageService } from "../../core/services/storage.service";
import { AuthService } from "../../core/services/auth.service";
import { ConfigService } from "../../core/services/config.service";


@Injectable()
export class LoginGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private httpConfig: ConfigService,
    private authService: AuthService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute) {}

  /**
   * Called by angular when a access is attempted for a route
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  /**
   * Called by angular when a child route is tried to access
   */
  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Returns whether a route can load or not
   */
  public canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  /**
   * Returns if the current user is considered authorized and logged in.
   * If not redirects the browser to the specified redirect url.
   */
  public checkLogin(url: string): Observable<boolean> {
    return this.authService.loggedIn.pipe(tap((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigate(['/protected']);
      }
    }), map((res) => {
      if (res === false) {
        return true;
      }
    }));
  }
}
