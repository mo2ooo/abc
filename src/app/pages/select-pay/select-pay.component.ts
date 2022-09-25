import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageDataService, PayModel, PayService} from '../../shared';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-select-pay',
    templateUrl: './select-pay.component.html',
    styleUrls: ['./select-pay.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPayComponent implements OnInit {
    payList: Array<PayModel>;
    selectPay: string;

    constructor(private payService: PayService,
                private pageDataService: PageDataService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.pageDataService.getSingleList(this.payService).then(result => {
            this.payList = result;
            this.payList = this.payList.filter(p => p.isEnable).sort((a, b) => a.sort - b.sort);
            if (this.payList) {
                this.selectPay = this.payList[0].id;
            }
        });
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    onFilter() {
        const data = this.payList.find(e => e.id === this.selectPay);
        this.modalCtrl.dismiss(data);
    }
}
