import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class UsersService extends BaseService<UserModel> {
    public isAuthenticated = true;

    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'users');
    }
}

