import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private http: HttpClient) {
    }

    /***
     * @description  http get
     */
    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(url).pipe(catchError(this.handleError));
    }

    /***
     * @description  http get with params
     * const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});
     */
    public getByParam<T>(url: string, category: string, year: string): Observable<T> {
        const httpParams = new HttpParams()
            .set('category', category)
            .set('year', year);
        return this.http.get<T>(url, {
            params: httpParams,
            responseType: 'json'
        });
    }

    /***
     * @description  http patch
     */
    public patch<T>(url: string, data: any): Observable<T> {
        return this.http.patch<T>(url, data, {withCredentials: true})
            .pipe(catchError(this.handleError));
    }

    /***
     * @description  http post
     */
    public post<T>(url: string, data: any): Observable<T> {
        return this.http.post<T>(url, data, {withCredentials: true})
            .pipe(catchError(this.handleError));
    }

    /***
     * @description  http put
     */
    public put<T>(url: string, data: any): Observable<T> {
        return this.http.put<T>(url, data, {withCredentials: true})
            .pipe(catchError(this.handleError));
    }

    /***
     * @description  http delete
     */
    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url, {withCredentials: true})
            .pipe(catchError(this.handleError));
    }

    private log(message: string) {
        console.log(message);
    }

    // private handleError<T>(operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    //
    //         // TODO: send the error to remote logging infrastructure
    //         console.error(error); // log to console instead
    //
    //         // TODO: better job of transforming error for user consumption
    //         // this.log(`${operation} failed: ${error.message}`);
    //
    //         // Let the app keep running by returning an empty result.
    //         return of(result as T);
    //     };
    // }

    private handleError<T>(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }

}
