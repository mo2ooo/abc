import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavoriteListPage} from './favorite-list.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: FavoriteListPage
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
    declarations: [FavoriteListPage]
})
export class FavoriteListPageModule {
}
