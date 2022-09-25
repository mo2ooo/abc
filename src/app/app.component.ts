import {Component, QueryList, ViewChildren} from '@angular/core';
import {IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {GlobalProvider, ToastProvider, AuthService} from './shared';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    lastBackPress = 0;
    timePeriodToExit = 2000;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private gProvider: GlobalProvider,
        private router: Router,
        private toastProvider: ToastProvider,
        private authService: AuthService
    ) {
        this.initializeApp();
        this.gProvider.isAndroid = this.platform.is('android');
        this.gProvider.isIos = this.platform.is('ipad') || this.platform.is('iphone')
            || this.platform.is('ios');
        this.gProvider.isWeb = this.platform.is('mobile');
        this.gProvider.isApp = this.platform.is('cordova');
        this.authService.device = this.gProvider.isAndroid ? 'Android' : 'Mobile';
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#AD0648');
            this.splashScreen.hide();
            this.backButton();
        });
    }

    backButton() {
        this.platform.backButton.subscribe(async () => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();
                } else if (this.router.url === '/tabs/home'
                    || this.router.url === '/tabs/goods-list'
                    || this.router.url === '/tabs/my'
                    || this.router.url === '/tabs/order'
                    || this.router.url === '/tabs/bags') {
                    if (new Date().getTime() - this.lastBackPress < this.timePeriodToExit) {
                        navigator['app'].exitApp();
                    } else {
                        this.toastProvider.show('Press back again to exit App');
                        this.lastBackPress = new Date().getTime();
                    }
                }
            });
        });
    }

}
