import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService, CouponsService, MyCouponsService} from '../../shared/fapi';
import {AnimationProvider, LoadingProvider, ToastProvider} from '../../shared/providers';
import {CouponModel, MyCouponModel} from '../../shared/model';
import {PageDataService} from '../../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-coupon-list',
    templateUrl: './coupon-list.page.html',
    styleUrls: ['./coupon-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CouponListPage implements OnInit {
    gList: Array<CouponModel>;
    tempList: Array<MyCouponModel>;

    constructor(private couponService: CouponsService,
                private loadingProvider: LoadingProvider,
                private toastProvider: ToastProvider,
                private myCouponService: MyCouponsService,
                private animationProvider: AnimationProvider,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.couponService.getList().subscribe(r => {
            this.gList = r;
            this.gList = this.gList.filter(c => c.enable)
                .filter(c => new Date(c.endDate) >= new Date() && new Date(c.beginDate) <= new Date())
                .sort((a, b) => a.sort - b.sort);
        });
    }

    animation(i) {
        return this.animationProvider.slideInLeft(i);
    }

    onTake(couponId: string) {
        this.myCouponService.getListByParam('userId', this.authService.user.uid).subscribe(async r => {
            this.tempList = r;
            const index = this.tempList.findIndex(c => c.couponId === couponId);
            if (index > -1) {
                await this.toastProvider.show('You\'ve got it');
            } else {
                const loader = await this.loadingProvider.create();
                await loader.present();
                const model = new MyCouponModel();
                model.couponId = couponId;
                model.userId = this.authService.user.uid;
                model.isExpire = false;
                model.isUsed = false;
                this.myCouponService.addModel(model).then(() => loader.dismiss().then(() => {
                    this.toastProvider.show('Get the success!');
                }), error1 => {
                    loader.dismiss().then(() => this.toastProvider.show(error1));
                });
            }
        });
    }

}
