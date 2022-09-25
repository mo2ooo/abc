import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GlobalProvider {
    public isIos: boolean;
    public isAndroid: boolean;
    public isWeb: boolean;
    public isApp: boolean;
    public cartKey = 'shopcart';
}
