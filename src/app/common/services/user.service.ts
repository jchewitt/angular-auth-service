import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { AppCommonModule } from "../app-common.module";
import { RegisterModel } from "../models/register.model";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: AppCommonModule
})
export class UserService {
  userLoaded: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: HttpClient) {
    /**/
  }

  public register(user: RegisterModel): Observable<any> {
    return this.http.post(`authapi://register`, user);
  }

  public loadUser(): Observable<UserModel> {
    return this.http.get('userapi://') as Observable<UserModel>;
  }
}
