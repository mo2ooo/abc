import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {
    AlertProvider,
    GlobalProvider,
    LoadingProvider,
    LogModel,
    UserModel,
    AuthService,
    LogService,
    UsersService
} from '../../shared';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    constructor(private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                private gProvider: GlobalProvider,
                private datePipe: DatePipe,
                private router: Router,
                private userService: UsersService,
                private logService: LogService,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private events: Events) {
        this.loginForm = this.formBuilder.group({
            email: ['test@gmail.com', [Validators.required, Validators.email]],
            pwd: ['123456', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit() {
    }

    async login() {
        const email = this.loginForm.controls.email.value;
        const pwd = this.loginForm.controls.pwd.value;
        const loader = await this.loadingProvider.create();
        await loader.present();
        this.authService.signWithEmail(email, pwd).then(r => loader.dismiss().then(() => {
            if (r) {
                const log = new LogModel();
                log.userId = r.user.uid;
                log.device = this.authService.device;
                log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
                this.logService.addLog(log);
                const user = new UserModel();
                user.uid = r.user.uid;
                user.id = r.user.uid;
                user.displayName = r.user.displayName;
                user.email = r.user.email;
                user.photoURL = r.user.photoURL;
                this.authService.user = user;
                this.authService.isAuthenticated = true;
                this.events.publish('login-success');
                this.router.navigateByUrl('/tabs/home').then();
            } else {
                this.alertProvider.present('invalid email or password');
            }
        }), error => loader.dismiss().then(() => this.alertProvider.present(error)));
    }

}
