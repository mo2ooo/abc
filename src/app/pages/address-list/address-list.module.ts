import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressListPage } from './address-list.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: AddressListPage
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
  declarations: [AddressListPage]
})
export class AddressListPageModule {}
