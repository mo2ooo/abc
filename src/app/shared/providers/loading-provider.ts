import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';


/**
 * @description
 */
@Injectable({providedIn: 'root'})
export class LoadingProvider {

    constructor(private loadingCtrl: LoadingController) {
    }

    async create() {
        const loader = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'bubbles',
            duration: 5000,
            showBackdrop: true,
        });
        return loader;
    }

    async presentWithOptions() {
        const loading = await this.loadingCtrl.create({
            spinner: null,
            duration: 5000,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }
}
