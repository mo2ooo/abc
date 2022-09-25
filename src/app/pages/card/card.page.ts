import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertProvider, GlobalProvider, ToastProvider} from '../../shared/providers';
import {PageDataService} from '../../shared';

@Component({
    selector: 'app-card',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardPage implements OnInit {

    constructor(private toastProvider: ToastProvider,
                private pageService: PageDataService,
                private gProvider: GlobalProvider,
                private alertProvider: AlertProvider) {
    }

    ngOnInit() {
    }
}
