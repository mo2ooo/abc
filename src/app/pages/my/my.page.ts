import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {AnimationProvider} from '../../shared/providers';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, UsersService} from '../../shared/fapi';

export interface Language {
    id: string;
    title: string;
}

@Component({
    selector: 'app-my',
    templateUrl: './my.page.html',
    styleUrls: ['./my.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MyPage implements OnInit {
    list = [
        {name: 'Address', img: 'leaf', url: '/pages/address-list'},
        {name: 'Discount', img: 'happy', url: '/pages/coupon-list'},
        {name: 'Card', img: 'card', url: '/pages/card'},
        {name: 'Favorite', img: 'heart', url: '/pages/favorite-list'},
        {name: 'Notification', img: 'notifications', url: '/pages/notice'},
        {name: 'About', img: 'help-circle', url: '/pages/about'}
    ];

    languages: Language[];
    selectedLanguage: string;
    customAlertOptions: any = {
        header: 'selected Language',
        translucent: true
    };

    constructor(private events: Events,
                private router: Router,
                private aProvider: AnimationProvider,
                private zone: NgZone,
                private translate: TranslateService,
                private userService: UsersService,
                public authService: AuthService) {
        this.translate.use('en');
    }

    ngOnInit() {
        this.languages = [
            {
                id: 'en',
                title: 'English'
            },
            {
                id: 'de',
                title: 'German'
            },
            {
                id: 'fr',
                title: 'French'
            },
            {
                id: 'es',
                title: 'Española'
            },
            {
                id: 'kr',
                title: 'Korea'
            },
            {
                id: 'cn',
                title: 'Chinese'
            },
        ];
        this.selectedLanguage = this.translate.currentLang;
        this.events.subscribe('login-success', r => {
            this.userService.getModel(this.authService.user.uid).subscribe(result => {
                this.authService.user = result;
            });
        });
    }

    animation(i) {
        return this.aProvider.slideInRight(i);
    }

    onLogin() {
        this.router.navigateByUrl('/login');
    }

    onRegister() {
        this.router.navigateByUrl('/register');
    }

    onlogout() {
        this.authService.isAuthenticated = false;
        this.authService.user = null;
        this.events.publish('logout');
    }

    setLanguage() {
        this.translate.use(this.selectedLanguage);
    }

}
