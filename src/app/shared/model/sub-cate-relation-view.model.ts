import {SubCateModel} from './sub-cate.model';

export class SubCateRelationViewModel extends SubCateModel {
    public cateId: string;

    constructor(model: any = {}) {
        super(model);
        this.cateId = model.cateId;

    }
}
