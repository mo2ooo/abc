import {Id} from './common.model';

export class SubCateModel implements Id {
  public id?: string;
  public name: string;
  public cateId: string;
  public description: string;
  public sort: number;
  public date: string;
  public img: string;

  public cateName?: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.img = model.img;
    this.name = model.name;
    this.cateId = model.cateId;
    this.description = model.description;
    this.date = model.date;
    this.sort = model.sort;
    this.cateName = model.cateName;
  }
}
