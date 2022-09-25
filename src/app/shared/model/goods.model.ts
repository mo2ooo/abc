import {Id} from './common.model';

export class GoodsModel implements Id {
    public id?: string;
    public name: string;
    public img: string;
    public sort: number;
    public price: number;
    public subCateId: string;
    public weight: number;
    public size: string;
    public shelfLife: number;
    public storageConditions: string;
    public isHot: boolean;
    public isNew: boolean;
    public description: string;
    public date: string;

    public isFavorite?: boolean;
    public isBag?: boolean;
    public cateName?: string;
    public rank?: number;
    public selectSizeIndex?: number;
    public selectSize?: string;

    constructor(good: any = {}) {
        this.subCateId = good.subCateId;
        this.id = good.id;
        this.img = good.img;
        this.name = good.name || '';
        this.price = good.price || 0;
        this.weight = good.weight;
        this.size = good.size || 'S';
        this.shelfLife = good.shelfLife;
        this.storageConditions = good.storageConditions;
        this.sort = good.sort;
        this.isHot = good.isHot;
        this.isNew = good.isNew;
        this.description = good.description;
        this.date = good.date;
        this.cateName = good.cateName;
        this.rank = good.rank || 0;
        this.isFavorite = good.isFavorite || false;
        this.isBag = good.isBag || false;
    }
}



