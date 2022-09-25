import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {GoodsDetailPage} from './goods-detail.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: GoodsDetailPage
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
    declarations: [GoodsDetailPage]
})
export class GoodsDetailPageModule {
}
