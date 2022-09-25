import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {GoodsListPage} from './goods-list.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: GoodsListPage
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
    declarations: [GoodsListPage]
})
export class GoodsListPageModule {
}
