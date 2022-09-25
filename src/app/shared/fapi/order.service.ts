import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoodsModel, OrderDetailModel, OrderModel, UserModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';


@Injectable({providedIn: 'root'})
export class OrderService extends BaseService<OrderModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'orders');
    }


    getList1(userId: string) {
        return this.db.collection<OrderModel>('orders',
            ref => ref.where('userId', '==', userId)).snapshotChanges()
            .pipe(
                switchMap(orders => {
                    const orderIds = orders.map(o => o.payload.doc.id);
                    return combineLatest([
                        of(orders.map(o => ({id: o.payload.doc.id, ...o.payload.doc.data()}))),
                        combineLatest(
                            orderIds.map(orderId =>
                                this.db.collection<OrderDetailModel>('orderdetail',
                                    ref => ref.where('orderId', '==', orderId))
                                    .valueChanges().pipe(map(detail => detail[0]), mergeMap(detail => {
                                    return this.db.doc<GoodsModel>(`/goods/${detail.goodId}`)
                                        .valueChanges()
                                        .pipe(map(g => ({...g, ...detail})));
                                }))
                            )
                        )
                    ]);
                }),
                map(([orders, details]) => {
                    return orders.map(order => {
                        return {
                            ...order,
                            detail: details.filter(d => d.orderId === order.id)[0],
                        };
                    });
                }));
    }


    getOrderList(userId: string) {
        return combineLatest(
            [this.db.collection<OrderModel>('orders', ref => ref.where('userId', '==', userId)).snapshotChanges(),
                this.db.collection<OrderDetailModel>('orderdetail').snapshotChanges(),
                this.db.collection<GoodsModel>('goods').snapshotChanges()
            ]).pipe(
            map(results => {
                const orderList = results[0].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as OrderModel;
                });
                const detailList = results[1].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as OrderDetailModel;
                });
                const goodList = results[2].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as GoodsModel;
                });
                const dgList = detailList.map(d => {
                    const good = goodList.find(g => g.id === d.goodId);
                    return ({...d, ...good});
                });
                orderList.sort((a, b) => +b.orderNo - +a.orderNo);
                return orderList ? orderList.map(order => {
                    return {
                        ...order,
                        details: dgList.filter(d => d.orderId === order.id)
                    };
                }) : [];
            }));

    }
}
