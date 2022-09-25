import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (!error.ok) {
            errMsg = 'Can\'t connect to server.';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }


    getUsCity(): Observable<any> {
        return this.http.get('./assets/data/us-cities.json', {withCredentials: false})
            .pipe(
                tap(data => data),
                catchError(this.handleError)
            );
    }

}
