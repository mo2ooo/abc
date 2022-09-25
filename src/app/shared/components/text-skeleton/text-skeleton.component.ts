import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-text-skeleton',
    templateUrl: './text-skeleton.component.html',
    styleUrls: ['./text-skeleton.component.scss'],
})
export class TextSkeletonComponent {
    dataText = '';

    @HostBinding('class.text-loaded') textLoaded = false;

    @Input() set data(val: any) {
        this.dataText = (val !== undefined && val !== null) ? val : '';
        if (this.dataText && this.dataText !== '') {
            this.textLoaded = true;
        } else {
            this.textLoaded = false;
        }
    }

}
