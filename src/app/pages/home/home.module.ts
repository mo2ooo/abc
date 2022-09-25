import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StepperModule, NoticeBarModule, CarouselModule} from 'ng-zorro-antd-mobile';
import {HomePage} from './home.page';
import {ComponentsModule} from '../../shared/components/components.module';


const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StepperModule,
        CarouselModule,
        NoticeBarModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
