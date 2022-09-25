import {Id} from './common.model';

export class UserModel implements Id {
  public id?: string;
  public uid: string;
  public displayName?: string;
  public email: string;
  public photoURL: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.uid = model.uid;
    this.displayName = model.displayName;
    this.email = model.email;
    this.photoURL = model.photoURL;
  }
}
