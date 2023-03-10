import {Id} from './common.model';

export class CateRelationModel implements Id {
  public id?: string;
  public cateId: string;
  public subCateId: string;


  constructor(model: any = {}) {
    this.id = model.id;
    this.cateId = model.cateId;
    this.subCateId = model.subCateId;
  }
}
