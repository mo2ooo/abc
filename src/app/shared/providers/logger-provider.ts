import {Injectable} from '@angular/core';


@Injectable()
export class LoggerProvider {
    log(msg: string): void {
        console.log(msg);
    }

    error(msg: string, obj = {}): void {
        console.error(msg, obj);
    }
}
