import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AddressModel, UserModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AddressService extends BaseService<AddressModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
    super(db, myErr, 'address');
  }

  getList1() {
    return this.db.collection<AddressModel>('address').valueChanges()
      .pipe(map(address => address[0]), mergeMap(address => {
        return this.db.doc<UserModel>(`/users/${address.userId}`)
          .valueChanges()
          .pipe(map(user => [({userName: user.displayName, ...address})]));
      }), catchError(this.myErr.handleError));
  }
}

