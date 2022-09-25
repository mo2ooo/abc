import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-img-skeleton',
    templateUrl: './img-skeleton.component.html',
    styleUrls: ['./img-skeleton.component.scss'],
})
export class ImgSkeletonComponent {
    img = '';
    altStr = '';

    @HostBinding('class.img-loaded') imageLoaded = false;

    @Input()
    set src(val: string) {
        this.img = (val !== undefined && val !== null) ? val : '';
    }

    @Input()
    set alt(val: string) {
        this.altStr = (val !== undefined && val !== null) ? val : '';
    }

    constructor() {
    }

    onImgLoad() {
        this.imageLoaded = true;
    }
}
