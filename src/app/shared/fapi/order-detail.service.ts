import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoodsModel, OrderDetailModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrderDetailService extends BaseService<OrderDetailModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'orderdetail');
    }

    getList1(orderId: string) {
        return this.db.collection<OrderDetailModel>('orderdetail',
            ref => ref.where('orderId', '==', orderId)).valueChanges()
            .pipe(map(detail => detail[0]), mergeMap(detail => {
                return this.db.doc<GoodsModel>(`/goods/${detail.goodId}`)
                    .valueChanges()
                    .pipe(map(g => [({...g, ...detail})]));
            }));
    }
}
