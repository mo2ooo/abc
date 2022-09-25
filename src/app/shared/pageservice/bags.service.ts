import {Injectable} from '@angular/core';
import {BagModel} from '../model';
import {LocalStorage} from 'ngx-store';

@Injectable({providedIn: 'root'})
export class BagsService {
    @LocalStorage() bagList: Array<BagModel> = [];

    constructor() {
    }

    public add(model: BagModel) {
        if (this.bagList.length === 0) {
            this.bagList = [new BagModel(model)];
        } else {
            const index = this.bagList.findIndex(g => g.id === model.id && g.size === model.size);
            if (index > -1) {
                this.bagList[index].num += model.num;
            } else {
                this.bagList = [new BagModel(model), ...this.bagList];
            }
        }
    }

    public remove(id: string, size: string) {
        const index = this.bagList.findIndex(g => g.id === id && g.size === size);
        if (index > -1) {
            this.bagList.splice(index, 1);
        }
    }

    public getList() {
        return this.bagList;
    }

    public changeNum(id: string, num: number, size: string) {
        const index = this.bagList.findIndex(g => g.id === id && g.size === size);
        if (index > -1) {
            this.bagList[index].num = num;
            this.bagList = this.bagList;
        }
    }

    public clear() {
        this.bagList = [];
    }
}
