import {Injectable} from '@angular/core';
import {BaseService} from '../fapi/base.service';
import {AlertProvider, LoadingProvider} from '../providers';
import {combineLatest} from 'rxjs';


@Injectable({providedIn: 'root'})
export class PageDataService {
    constructor(private loadProvider: LoadingProvider,
                private alertProvider: AlertProvider) {
    }

    getList(serviceList: Array<any>): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            combineLatest(serviceList).subscribe(results => {
                if (results) {
                    resolve(results);
                }
            }, error => this.alertProvider.present(error));
        });
    }

    // getList(serviceList: Array<any>): Promise<any> {
    //     return new Promise<any>(async (resolve, reject) => {
    //         const loader = await this.loadProvider.create();
    //         await loader.present();
    //         combineLatest(serviceList).subscribe(results => {
    //             loader.dismiss().then(() => {
    //                 if (results) {
    //                     resolve(results);
    //                 }
    //             });
    //         }, error => loader.dismiss().then(() => this.alertProvider.present(error)));
    //     });
    // }

    getSingleList<T>(service: BaseService<T>): Promise<Array<T>> {
        return new Promise<Array<T>>(async (resolve, reject) => {
            const loader = await this.loadProvider.create();
            await loader.present();
            service.getList().subscribe(result => {
                loader.dismiss().then(() => {
                    resolve(result);
                });
            }, error => loader.dismiss().then(() => this.alertProvider.present(error)));
        });
    }

    getModel<T>(service: BaseService<T>, id: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const loader = await this.loadProvider.create();
            await loader.present();
            service.getModel(id).subscribe(result => {
                loader.dismiss().then(() => {
                    resolve(result);
                });
            }, error => loader.dismiss().then(() => this.alertProvider.present(error)));
        });
    }

    addModel<T>(service: BaseService<T>, model: T): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const loader = await this.loadProvider.create();
            await loader.present();
            service.addModel(model).then(result => {
                loader.dismiss().then(() => {
                    resolve(result.id);
                });
            }, error => loader.dismiss().then(() => this.alertProvider.present(error)));
        });
    }

}
