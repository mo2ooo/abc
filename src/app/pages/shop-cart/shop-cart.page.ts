import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {BagModel, GoodsModel, GoodsService, BagsService} from '../../shared';


@Component({
    selector: 'app-shop-cart',
    templateUrl: './shop-cart.page.html',
    styleUrls: ['./shop-cart.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopCartPage implements AfterViewInit {
    value = 1;
    goodModel: GoodsModel;

    constructor(public modalCtrl: ModalController,
                public navParams: NavParams,
                private bagsService: BagsService,
                private goodService: GoodsService) {
    }

    ngAfterViewInit() {
        const id = this.navParams.get('selectId');
        this.goodService.getModel(id).subscribe(g => this.goodModel = g);
    }

    change(event) {
        this.value = event;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    addCart() {
        const bag = new BagModel();
        bag.num = this.value;
        this.bagsService.add(bag);
        this.modalCtrl.dismiss();
    }

}
