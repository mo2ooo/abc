import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpInterceptor implements HttpInterceptor {
    constructor(@Inject('API_URL') private apiUrl: string
                // public errorDialogService: ErrorDialogService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('token');
        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }

        req = req.clone({headers: req.headers.set('Accept', 'application/json'), url: `${this.apiUrl}/${req.url}`});
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                // this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}
