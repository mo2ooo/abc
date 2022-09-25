import {Id} from './common.model';
import {CouponModel} from './coupon.model';


export class MyCouponModel implements Id {
    public id?: string;
    public userId: string;
    public couponId: string;
    public isUsed: boolean;
    public isExpire: boolean;

    public constructor(model: any = {}) {
        this.id = model.id;
        this.couponId = model.couponId;
        this.userId = model.userId;
        this.isUsed = model.isUsed;
        this.isExpire = model.isExpire;
    }
}


export class MyCouponView extends CouponModel {
    public myId: string;
    public userId: string;
    public couponId: string;
    public isUsed: boolean;
    public isExpire: boolean;

    public constructor(model: any = {}) {
        super(model);
        this.couponId = model.couponId;
        this.userId = model.userId;
        this.isUsed = model.isUsed;
        this.isExpire = model.isExpire;
        this.myId = model.myId;
    }
}
