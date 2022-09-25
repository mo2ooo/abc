import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BagModel, BagsService} from '../../shared';

@Component({
    selector: 'app-bags',
    templateUrl: './bags.page.html',
    styleUrls: ['./bags.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BagsPage implements OnInit {
    bagList: Array<BagModel>;
    total: string;
    value = 1;
    allCheck = false;

    constructor(private bagsService: BagsService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.bind();
    }

    bind() {
        this.bagList = this.bagsService.getList();
        if (this.bagList) {
            this.total = this.bagList.map(g => g.price * g.num).reduce((p, c) => p + c, 0).toFixed(2);
            this.isAllCheck();
        }
    }

    change(num: number, item) {
        this.total = this.bagList.filter(g => g.isCheck).map(g => g.id === item.id ? num * g.price : g.num * g.price)
            .reduce((p, c) => p + c, 0)
            .toFixed(2);
        this.bagsService.changeNum(item.id, num, item.size);
    }

    delete(item) {
        this.bagsService.remove(item.id, item.size);
        this.bagList = this.bagsService.getList();
        this.isAllCheck();
    }

    checkSum() {
        this.total = this.bagList.filter(g => g.isCheck)
            .map(g => g.price * g.num)
            .reduce((p, c) => p + c, 0)
            .toFixed(2);
        this.isAllCheck();
    }

    isAllCheck() {
        this.allCheck = this.bagList.filter(g => g.isCheck).length === this.bagList.length;
    }

    checkAll() {
        if (this.allCheck) {
            this.bagList.map(g => g.isCheck = true);
        }
    }
}
