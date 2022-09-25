import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DeliveryModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class DeliveryService extends BaseService<DeliveryModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
    super(db, myErr, 'delivery');
  }
}

