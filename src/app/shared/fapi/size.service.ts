import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {SizeModel} from '../model';

@Injectable({providedIn: 'root'})
export class SizeService extends BaseService<SizeModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'size');
    }
}

