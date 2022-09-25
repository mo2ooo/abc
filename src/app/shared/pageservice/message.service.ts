import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
    private message = new Subject<string>();

    publish(topic: string) {
        this.message.next(topic);
    }

    subscribe() {
        return this.message.asObservable();
    }
}
