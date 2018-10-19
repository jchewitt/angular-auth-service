import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from "rxjs";
import { StorageService } from "./storage.service";
import { AuthUser } from "../models/auth-user.model";
import { ConfigService } from "./config.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: ReplaySubject<boolean> = new ReplaySubject(1);
  public isLoggedIn: boolean = false;
  public user: AuthUser;

  constructor(private storage: StorageService, private config: ConfigService, private http: HttpClient) {/**/}

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
    return this.http.post(this.config.authConfig.authority, {email, password}).pipe(
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

  /**
   * Returns the string for the authorization header
   * @param {AuthUser} user
   * @returns {string}
   */
  public getAuthHeaderString(user?: AuthUser): string {
    if (user) {
      return `${user.token_type} ${user.access_token}`;
    } else if (this.user) {
      return `${this.user.token_type} ${this.user.access_token}`
    }
    return '';
  }

  /**
   * Checks if the user is still authorized or not
   * @param {AuthUser} user
   * @returns {Observable<boolean>}
   */
  private checkUser(user: AuthUser): Observable<boolean> {
    const headers = {Authorization: this.getAuthHeaderString(user)};
    return this.http.get(this.config.authConfig.authCheck, {headers}).pipe(
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
    const user = this.storage.get('catalina');
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
    user.expired = false;
    this.user = user;
    this.storage.set('catalina', user);
  }

  /**
   * Sets the user as logged in and calls next on the logged in subject
   * @param {boolean} value
   */
  private setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
    this.isLoggedIn = value;
  }
}
