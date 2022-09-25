import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CouponListPage } from './coupon-list.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CouponListPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
  declarations: [CouponListPage]
})
export class CouponListPageModule {}
