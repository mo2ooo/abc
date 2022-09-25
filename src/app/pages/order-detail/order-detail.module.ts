import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StepsModule} from 'ng-zorro-antd-mobile';
import {OrderDetailPage} from './order-detail.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: OrderDetailPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StepsModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [OrderDetailPage]
})
export class OrderDetailPageModule {
}
