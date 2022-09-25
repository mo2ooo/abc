export class BagModel {
    public isCheck: boolean;
    public num: number;
    public name: string;
    public img: string;
    public id: string;
    public price: number;
    public size: string;

    public constructor(model: any = {}) {
        this.isCheck = model.isCheck;
        this.num = model.num || 0;
        this.name = model.name;
        this.img = model.img;
        this.id = model.id;
        this.price = model.price;
        this.size = model.size;
    }
}
