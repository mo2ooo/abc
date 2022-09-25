import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SkeletonComponent {
    list = [];

    @Input() set rows(val: number) {
        this.list = Array.from({length: val}, (v, i) => i);
    }

    constructor() {
    }


}
