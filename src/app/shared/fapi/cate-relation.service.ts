import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CateRelationModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class CateRelationService extends BaseService<CateRelationModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
    super(db, myErr, 'caterelation');
  }

}
