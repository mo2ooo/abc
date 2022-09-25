import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class ToastProvider {
    constructor(private toastCtrl: ToastController) {
    }

    async show(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });
        return await toast.present();
    }

    async showMiddle(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        return await toast.present();
    }

    async showCloseButton(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        return await toast.present();
    }
}
