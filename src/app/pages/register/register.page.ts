import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertProvider, LoadingProvider} from '../../shared/providers';
import {Router} from '@angular/router';
import {AuthService, LogService, UsersService} from '../../shared/fapi';
import {LogModel, UserModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterPage implements OnInit {
    rForm: FormGroup;

    constructor(private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                private router: Router,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private events: Events,
                private datePipe: DatePipe,
                private userService: UsersService,
                private logService: LogService) {
        this.rForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            pwd: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit() {
    }

    async register() {
        const email = this.rForm.controls.email.value;
        const pwd = this.rForm.controls.pwd.value;
        const name = this.rForm.controls.name.value;
        const loader = await this.loadingProvider.create();
        await loader.present();
        this.authService.signUp(email, pwd).then(r => loader.dismiss().then(() => {
            if (r) {
                const log = new LogModel();
                log.userId = r.user.uid;
                log.device = this.authService.device;
                log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
                forkJoin([this.authService.updateUser(r.user, name), this.logService.addModel(log)])
                    .subscribe(results => {
                        const user = new UserModel(r.user);
                        user.displayName = name;
                        this.authService.user = user;
                        this.authService.isAuthenticated = true;
                        this.events.publish('reg-success');
                        this.router.navigateByUrl('/tabs/home');
                    });
            } else {
                this.alertProvider.present('Sign up fail!');
            }
        }), error => loader.dismiss().then(() => this.alertProvider.present(error)));
    }

}
