import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CouponModel, MyCouponModel, MyCouponView, UserModel} from '../../shared/model';
import {CouponsService, MyCouponsService} from '../../shared/fapi';
import {ModalController} from '@ionic/angular';
import {SessionStorage} from 'ngx-store';
import {PageDataService} from '../../shared';

@Component({
    selector: 'app-select-coupon',
    templateUrl: './select-coupon.component.html',
    styleUrls: ['./select-coupon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectCouponComponent implements OnInit {
    @SessionStorage() user: UserModel;
    gList: Array<MyCouponView>;
    myCouponList: Array<MyCouponModel>;
    couponList: Array<CouponModel>;
    selectCoupon: string;

    constructor(private myCouponService: MyCouponsService,
                private couponsService: CouponsService,
                private pageDataService: PageDataService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.pageDataService.getList([this.myCouponService.getListByParam('userId', this.user.uid),
            this.couponsService.getList()]).then(results => {
            this.myCouponList = results[0];
            this.couponList = results[1];
            this.gList = this.myCouponList.map(my => {
                const model = this.couponList.find(c => c.id === my.couponId);
                return ({myId: my.id, ...my, ...model});
            });
            this.gList.forEach((model, index, array) => {
                if (!model.isExpire && new Date(model.beginDate) <= new Date() && new Date(model.endDate) >= new Date()) {
                    array[index].isExpire = false;
                } else {
                    array[index].isExpire = true;
                }
            });
            this.gList = this.gList.sort((a, b) => a.sort - b.sort);
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    onFilter() {
        const data = this.gList.find(e => e.couponId === this.selectCoupon && e.isExpire === false && e.isUsed === false);
        this.modalCtrl.dismiss(data);
    }

}
