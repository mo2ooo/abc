import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoodReviewsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class GoodReviewsService extends BaseService<GoodReviewsModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError) {
    super(db, myErr, 'goodReviews');
  }
}
