import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '@ionic/angular';
import {SessionStorage} from 'ngx-store';
import {CityService} from '../../shared/api/city.service';
import {
    AddressService,
    AlertProvider,
    AddressModel,
    UserModel,
    PageDataService
} from '../../shared';

@Component({
    selector: 'app-my-address',
    templateUrl: './my-address.page.html',
    styleUrls: ['./my-address.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MyAddressPage implements OnInit {
    aForm: FormGroup;
    data = [];
    name1 = 'Select City';
    value1 = [];
    value = [];
    @SessionStorage() user: UserModel;

    constructor(private formBuilder: FormBuilder,
                private addressService: AddressService,
                private alertProvider: AlertProvider,
                private cityService: CityService,
                private pageService: PageDataService,
                private event: Events
    ) {
        this.aForm = this.formBuilder.group({
            name: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
            phone: [''],
            street: ['']
        });
    }

    ngOnInit() {
        this.initUsCity();
    }

    initUsCity() {
        this.cityService.getUsCity().subscribe(result => {
            Object.keys(result).forEach((value) => {
                const itemLevel1 = {value, label: value, children: []};
                result[value].map(c => {
                    itemLevel1.children.push({value: c, label: c, children: []});
                });
                this.data.push(itemLevel1);
            });
        });
    }

    save() {
        const model = new AddressModel();
        model.nickName = this.aForm.controls.name.value;
        model.phone = this.aForm.controls.phone.value;
        model.address = this.name1;
        model.street = this.aForm.controls.street.value;
        model.userId = this.user.uid;
        this.pageService.addModel(this.addressService, model).then(() => {
            this.aForm.reset();
            this.event.publish('add-address');
            this.alertProvider.present('add address success!');
        });
    }

    getResult(result) {
        this.value = [];
        let temp = '';
        result.forEach(item => {
            this.value.push(item.label || item);
            temp += item.label || item;
        });
        return this.value.map(v => v).join(',');
    }

    onOk(result) {
        this.name1 = this.getResult(result);

    }

    onDismiss() {
    }

}
