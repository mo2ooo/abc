import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SessionStorage} from 'ngx-store';
import {AddressModel, AddressService, AlertProvider, LoadingProvider, UserModel} from '../../shared';

@Component({
    selector: 'app-select-address',
    templateUrl: './select-address.component.html',
    styleUrls: ['./select-address.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectAddressComponent implements OnInit {
    @SessionStorage() user: UserModel;
    addressList: Array<AddressModel>;
    selectAddress: string;

    constructor(private addressService: AddressService,
                private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.getList();
    }

    async getList() {
        const loader = await this.loadingProvider.create();
        await loader.present();
        this.addressService.getListByParam('userId', this.user.uid)
            .subscribe(result => loader.dismiss().then(() => {
                this.addressList = result;
                if (this.addressList.length > 0) {
                    this.selectAddress = this.addressList[0].id;
                }
            }), error => loader.dismiss().then(() => this.alertProvider.present(error)));
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    onFilter() {
        const data = this.addressList.find(e => e.id === this.selectAddress);
        this.modalCtrl.dismiss(data);
    }

}
