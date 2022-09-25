import {ErrorHandler, Injectable} from '@angular/core';
import {AlertProvider} from './providers';

@Injectable({providedIn: 'root'})
export class MyErrorHandler implements ErrorHandler {
    constructor(private alertProvider: AlertProvider) {
    }

    handleError(error: any): void {
        console.log(error);
        this.alertProvider.present(error);
    }

}
