import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SettlePage} from './settle.page';
import {SelectExpressPage} from '../select-express/select-express.page';
import {SelectAddressComponent} from '../select-address/select-address.component';
import {SelectPayComponent} from '../select-pay/select-pay.component';
import {SelectCouponComponent} from '../select-coupon/select-coupon.component';

const routes: Routes = [
    {
        path: '',
        component: SettlePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SettlePage, SelectExpressPage, SelectAddressComponent, SelectPayComponent, SelectCouponComponent],
    providers: [DatePipe],
    entryComponents: [SelectExpressPage, SelectAddressComponent, SelectPayComponent, SelectCouponComponent]
})
export class SettlePageModule {
}
