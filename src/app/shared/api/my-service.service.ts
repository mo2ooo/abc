import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyServiceService {
    url = 'assets/myData.json';

    constructor(private http: HttpService) {
    }

    public getUser(): Observable<any> {
        return this.http.get(this.url);
    }
}
