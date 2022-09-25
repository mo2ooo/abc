import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MyCouponModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class MyCouponsService extends BaseService<MyCouponModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'mycoupon');
    }
}

