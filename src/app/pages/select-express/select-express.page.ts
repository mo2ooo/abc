import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DeliveryService} from '../../shared/fapi';
import {DeliveryModel} from '../../shared/model';
import {PageDataService} from '../../shared';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-select-express',
    templateUrl: './select-express.page.html',
    styleUrls: ['./select-express.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectExpressPage implements OnInit {
    expressList: Array<DeliveryModel>;
    selectExpress: string;

    constructor(private expressService: DeliveryService,
                private pageService: PageDataService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.pageService.getSingleList(this.expressService).then(result => {
            this.expressList = result;
            this.expressList = this.expressList.filter(e => e.isEnable);
            if (this.expressList) {
                this.selectExpress = this.expressList[0].id;
            }
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    onFilter() {
        const data = this.expressList.find(e => e.id === this.selectExpress);
        this.modalCtrl.dismiss(data);
    }

}
