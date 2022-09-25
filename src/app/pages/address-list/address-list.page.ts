import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {AddressService, AuthService} from '../../shared/fapi';
import {AddressModel} from '../../shared/model';

@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.page.html',
    styleUrls: ['./address-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddressListPage implements OnInit {
    list: Array<AddressModel>;

    constructor(
        private addService: AddressService,
        public authService: AuthService,
        private  router: Router,
        private event: Events) {
    }

    ngOnInit() {
        this.addressSub();
        this.getAddress();
    }

    getAddress() {
        this.addService.getList().subscribe(r => {
            this.list = r;
            this.list = this.list.filter(a => a.userId === this.authService.user.uid);
        });
    }

    public addressSub() {
        this.event.subscribe('add-address', s => this.getAddress());
    }

    addAddress() {
        this.router.navigateByUrl('/pages/my-address');
    }

}
