import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {OwsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class OwsService extends BaseService<OwsModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
    super(db, myErr, 'ows');
  }
}

