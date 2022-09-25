import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabsPage {

    constructor(private translate: TranslateService) {
        this.translate.use('en');
    }

}
