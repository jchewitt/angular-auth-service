import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class UserService {
    userLoaded: ReplaySubject<any> = new ReplaySubject(1);
    constructor(private http: HttpClient) {
        /**/
    }

    loadUser(): Observable<any> {
        return this.http.get('userapi://');
    }
}
