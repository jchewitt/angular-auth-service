import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from "rxjs";
import { StorageService } from "./storage.service";
import { AuthUser } from "../models/auth-user.model";
import { ConfigService } from "./config.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/internal/operators";
import { ParsedToken } from "../models/parsed-token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: ReplaySubject<boolean> = new ReplaySubject(1);
  public isLoggedIn: boolean = false;
  public user: AuthUser;

  constructor(private storage: StorageService, private config: ConfigService, private http: HttpClient) {/**/
  }

  /**
   * Initializes the service
   */
  public initialize() {
    // TODO: add logic to validat user from storage
    const user = this.getUser();
    if (this.user !== null) {
      this.checkUser(user).subscribe(res => {
        if (res) {
          this.setUser(user);
          this.setLoggedIn(true);
        } else {
          this.setLoggedIn(false);
        }
      });
    }
    else {
      this.setLoggedIn(false);
    }
  }

  /**
   * Attempts to log in a user
   * @param {string} email
   * @param {string} password
   * @returns {Observable<boolean>}
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.config.authConfig.signin_url, {email, password}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.setLoggedIn(false);
        return of(false);
      }),
      map((res: AuthUser) => {
        if (!res) {
          return false;
        }
        this.setUser(res);
        this.setLoggedIn(true);
        return true;
      })
    );
  }

  public logout(): Observable<boolean> {
    return this.http.get(this.config.authConfig.signout_url).pipe(map(res => {
      this.setLoggedIn(false);
      this.setUser(null);
      return true
    }));
  }

  /**
   * Returns the string for the authorization header
   * @param {AuthUser} user
   * @returns {string}
   */
  public getAuthHeaderString(user?: AuthUser): string {
    if (user) {
      return `${user.token}`;
    } else if (this.user) {
      return `${this.user.token}`
    }
    return '';
  }

  /**
   * Checks if the user is still authorized or not
   * @param {AuthUser} user
   * @returns {Observable<boolean>}
   */
  private checkUser(user: AuthUser): Observable<boolean> {
    const headers = {'x-access-token': this.getAuthHeaderString(user)};
    return this.http.get(this.config.authConfig.auth_check, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200) {
          return of(true);
        }
        return of(false);
      }),
      map(res => {
        if (res === false) {
          return false;
        }
        return true;
      })
    );
  }

  /**
   * Gets the user from local storage
   * @returns {AuthUser | null}
   */
  private getUser(): AuthUser | null {
    const user = this.storage.get('jhngauth');
    if (user) {
      return user;
    }
    return null;
  }

  /**
   * Sets the user in local storage
   * @param {AuthUser} user
   */
  private setUser(user: AuthUser): void {
    // TODO: add logic to set an expires datetime for the user
    if (!user) {
      this.user = null;
      this.storage.set('jhngauth', null);
    }
    user.expired = false;
    this.user = user;
    this.storage.set('jhngauth', user);
  }

  /**
   * Sets the user as logged in and calls next on the logged in subject
   * @param {boolean} value
   */
  private setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
    this.isLoggedIn = value;
  }

  private parseJwt(token: string): ParsedToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const parsed = JSON.parse(window.atob(base64));
    return parsed;
  }
}
