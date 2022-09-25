import {Id} from './common.model';

export class SizeModel implements Id {
  public id?: string;
  public name: string;
  public sort: number;
  public date: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.sort = model.sort;
    this.name = model.name;
    this.date = model.date;
  }
}
