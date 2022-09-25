import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    GoodsModel,
    GoodsService,
    OrderDetailModel,
    OrderDetailService,
    OrderDetailView,
    OrderModel,
    OrderService,
    PageDataService
} from '../../shared';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.page.html',
    styleUrls: ['./order-detail.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderDetailPage implements OnInit {
    orderModel: OrderModel;
    dList: Array<OrderDetailModel>;
    gList: Array<GoodsModel>;
    detailList: Array<OrderDetailView>;

    constructor(private route: ActivatedRoute,
                private orderService: OrderService,
                private goodService: GoodsService,
                private dService: OrderDetailService,
                private pService: PageDataService) {
        const id = this.route.snapshot.paramMap.get('id');
        this.pService.getList([this.orderService.getModel(id), this.dService.getListByParam('orderId', id),
            this.goodService.getList()]).then(results => {
            this.orderModel = results[0];
            this.dList = results[1];
            this.gList = results[2];
            this.detailList = this.dList.map(d => {
                const good = this.gList.find(g => g.id === d.goodId);
                return ({img: good.img, name: good.name, ...d});
            });
        });
    }

    ngOnInit() {

    }

}
