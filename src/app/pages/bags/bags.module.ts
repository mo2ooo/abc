import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BagsPage } from './bags.page';
import {StepperModule} from 'ng-zorro-antd-mobile';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: BagsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        StepperModule,
        ComponentsModule
    ],
  declarations: [BagsPage]
})
export class BagsPageModule {}
