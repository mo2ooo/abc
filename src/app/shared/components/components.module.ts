import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {SkeletonComponent} from './skeleton/skeleton.component';
import {ImgSkeletonComponent} from './img-skeleton/img-skeleton.component';
import {TextSkeletonComponent} from './text-skeleton/text-skeleton.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
    ],
    declarations: [
        ImgSkeletonComponent,
        TextSkeletonComponent,
        SkeletonComponent
    ],
    exports: [
        SkeletonComponent,
        ImgSkeletonComponent
    ],
    entryComponents: [],
})
export class ComponentsModule {
}
