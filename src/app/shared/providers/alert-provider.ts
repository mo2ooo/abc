import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AlertProvider {
    constructor(private alertCtrl: AlertController) {
    }

    async present(msg: string) {
        const alert = await this.alertCtrl.create({
            subHeader: 'info',
            message: msg,
            buttons: ['OK']
        });
        await alert.present();
    }

    presentOk(msg: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const alert = await this.alertCtrl.create({
                header: 'info',
                message: msg,
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        alert.dismiss().then(() => {
                            resolve(true);
                        });
                        return false;
                    }
                }]
            });

            await alert.present();
        });
    }


    async confirm(msg: string) {
        const alert = await this.alertCtrl.create({
            message: msg,
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'ok',
                    handler: () => {
                        console.log('ok clicked');
                    }
                }
            ]
        });
        return await alert.present();
    }
}

