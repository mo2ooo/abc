import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoticePage } from './notice.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: NoticePage
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
  declarations: [NoticePage]
})
export class NoticePageModule {}
