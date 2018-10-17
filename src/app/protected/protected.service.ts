import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ProtectedService {
    constructor(private http: HttpClient) {}

    public getRetailer(id: number, startDate: string, endDate: string): Observable<any> {
        const params = {
            id: id.toString(),
            start: '',
            end: ''
        };
        params.start = `${startDate}-${startDate}-${startDate}`;
        params.end = `${endDate}-${endDate}-${endDate}`;
        return this.http.get(`retailapi://`, { params });
    }
}
