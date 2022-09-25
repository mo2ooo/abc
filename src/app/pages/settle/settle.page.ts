import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {SessionStorage} from 'ngx-store';
import {ModalController} from '@ionic/angular';
import {SelectExpressPage} from '../select-express/select-express.page';
import {SelectAddressComponent} from '../select-address/select-address.component';
import {SelectPayComponent} from '../select-pay/select-pay.component';
import {SelectCouponComponent} from '../select-coupon/select-coupon.component';
import {forkJoin} from 'rxjs';
import {
    BagsService,
    PageDataService,
    AlertProvider,
    GlobalProvider,
    AddressService,
    OrderService,
    PayService,
    OrderDetailService,
    AddressModel,
    BagModel,
    OrderDetailModel,
    OrderModel,
    PayModel,
    UserModel,
    DeliveryModel,
    DeliveryService,
    MyCouponView,
    LoadingProvider,
    MyCouponsService,
    MyCouponModel
} from '../../shared';


@Component({
    selector: 'app-settle',
    templateUrl: './settle.page.html',
    styleUrls: ['./settle.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettlePage implements OnInit {
    @SessionStorage() user: UserModel;
    bagList: Array<BagModel>;
    addressList: Array<AddressModel>;
    payList: Array<PayModel>;
    expressList: Array<DeliveryModel>;
    addressModel: AddressModel;
    payModel: PayModel;
    expressModel: DeliveryModel;
    discountModel: MyCouponView;
    amount = 0;

    constructor(private loadingProvider: LoadingProvider,
                private payService: PayService,
                private addressService: AddressService,
                private orderService: OrderService,
                private expressService: DeliveryService,
                private oDetailService: OrderDetailService,
                private gProvider: GlobalProvider,
                public modalCtrl: ModalController,
                private myCouponService: MyCouponsService,
                private pageService: PageDataService,
                private bagsService: BagsService,
                private datePipe: DatePipe,
                private router: Router,
                private alertProvider: AlertProvider) {
    }

    ngOnInit() {
        this.bagList = this.bagsService.getList();
        this.amount = +this.bagList.map(g => g.price * g.num).reduce((p, c) => p + c, 0).toFixed(2);
        this.getInfo();
    }

    getInfo() {
        const list: Array<any> = [this.payService.getList(),
            this.addressService.getListByParam('userId', this.user.uid),
            this.expressService.getList()];
        this.pageService.getList(list).then(results => {
            this.payList = results[0];
            this.addressList = results[1];
            this.expressList = results[2];
            this.payList = this.payList.filter(p => p.isEnable);
            this.expressList = this.expressList.filter(e => e.isEnable);
            if (this.addressList) {
                this.addressModel = this.addressList[0];
            }
            if (this.payList) {
                this.payModel = this.payList[0];
            }
            if (this.expressList) {
                this.expressModel = this.expressList[0];
            }
        });
    }

    change(id) {
        this.addressModel = this.addressList.find(a => a.id === id);
    }

    async onExpress() {
        try {
            const modal = await this.modalCtrl.create({
                component: SelectExpressPage, cssClass: 'express-modal',
            });
            await modal.present();
            const {data} = await modal.onWillDismiss();
            if (data) {
                this.expressModel = data;
            }
        } catch (e) {
        }
    }

    async onAddress() {
        try {
            const modal = await this.modalCtrl.create({
                component: SelectAddressComponent, cssClass: 'address-modal',
            });
            await modal.present();
            const {data} = await modal.onWillDismiss();
            if (data) {
                this.addressModel = data;
            }
        } catch (e) {

        }
    }

    async onPay() {
        try {
            const modal = await this.modalCtrl.create({
                component: SelectPayComponent, cssClass: 'pay-modal',
            });
            await modal.present();
            const {data} = await modal.onWillDismiss();
            if (data) {
                this.payModel = data;
            }
        } catch (e) {

        }
    }

    async onDiscount() {
        try {
            const modal = await this.modalCtrl.create({
                component: SelectCouponComponent, cssClass: 'pay-modal',
            });
            await modal.present();
            const {data} = await modal.onWillDismiss();
            if (data) {
                if (data.amount > this.amount) {
                    await this.alertProvider.present('Do not the conditions of use');
                } else {
                    this.discountModel = data;
                }

            }
        } catch (e) {

        }
    }

    async onSubmit() {
        const orderModel = new OrderModel();
        orderModel.orderNo = new Date().getTime().toString();
        orderModel.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        orderModel.num = this.bagList.map(g => g.num).reduce((p, c) => p + c, 0);
        orderModel.amount = this.amount;
        orderModel.userId = this.user.uid;
        orderModel.status = 'start';
        orderModel.userName = this.user.displayName;
        orderModel.address = `${this.addressModel.address}-${this.addressModel.street}`;
        orderModel.delivery = this.expressModel.name;
        orderModel.deliveryDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        orderModel.pay = this.payModel.name;
        orderModel.payDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        orderModel.payDiscount = 0;
        orderModel.discount = this.discountModel ? this.discountModel.discountAmount : 0;
        orderModel.freight = this.expressModel ? this.expressModel.cost : 0;
        orderModel.total = orderModel.amount + orderModel.discount + orderModel.freight;

        const loader = await this.loadingProvider.create();
        await loader.present();
        this.orderService.addModel(orderModel).then(r => {
            const addArr = [];
            this.bagList.map(g => {
                const detail = new OrderDetailModel();
                detail.orderId = r.id;
                detail.goodId = g.id;
                detail.num = g.num;
                detail.amount = +(g.num * g.price).toFixed(2);
                detail.detailPrice = g.price;
                detail.size = g.size;
                addArr.push(this.oDetailService.addModel(detail));
            });
            if (this.discountModel) {
                const myCoupon = new MyCouponModel();
                myCoupon.couponId = this.discountModel.couponId;
                myCoupon.userId = this.user.uid;
                myCoupon.isUsed = true;
                myCoupon.isExpire = false;
                myCoupon.id = this.discountModel.myId;
                addArr.push(this.myCouponService.update(myCoupon));
            }
            forkJoin(addArr).subscribe(() => loader.dismiss().then(() => {
                this.bagsService.clear();
                this.alertProvider.presentOk('Order submit success!').then((s) => {
                    if (s) {
                        this.router.navigateByUrl('/tabs/my');
                    }
                });
            }));

        }, err => loader.dismiss().then(() => this.alertProvider.present(err)));
    }
}
