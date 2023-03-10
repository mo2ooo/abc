import {Id} from './common.model';

export class CateModel implements Id {
  public id?: string;
  public name: string;
  public sort: number;
  public date: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.date = model.date;
    this.sort = model.sort;
  }
}
