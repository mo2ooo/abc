import {Id} from './common.model';

export class OrderDetailModel implements Id {
    public id?: string;
    public orderId: string;
    public goodId: string;
    public num: number;
    public detailPrice: number;
    public amount: number;
    public size: string;

    constructor(model: any = {}) {
        this.id = model.id;
        this.orderId = model.orderId;
        this.goodId = model.goodId;
        this.num = model.num;
        this.amount = model.amount;
        this.detailPrice = model.detailPrice;
        this.size = model.size;
    }
}

export class OrderDetailView {
    public name: string;
    public id?: string;
    public orderId: string;
    public goodId: string;
    public num: number;
    public detailPrice: number;
    public amount: number;
    public img: string;
    public size: string;

    constructor(model: any = {}) {
        this.name = model.name;
        this.id = model.id;
        this.orderId = model.orderId;
        this.goodId = model.goodId;
        this.num = model.num;
        this.detailPrice = model.detailPrice;
        this.amount = model.amount;
        this.img = model.img;
        this.size = model.size;

    }
}




