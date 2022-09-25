import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ListModule} from 'ng-zorro-antd-mobile';
import {PickerModule} from 'ng-zorro-antd-mobile';
import {MyAddressPage} from './my-address.page';

const routes: Routes = [
    {
        path: '',
        component: MyAddressPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListModule,
        PickerModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [MyAddressPage]
})
export class MyAddressPageModule {

}
