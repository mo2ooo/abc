import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {LogModel} from '../model';

@Injectable({providedIn: 'root'})
export class LogService extends BaseService<LogModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'logs');
    }

    addLog(item: LogModel) {
        return this.baseCollection.add(JSON.parse(JSON.stringify(item)));
    }
}

