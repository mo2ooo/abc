export class FilterModel {
    public type: number;
    public name: string;
    public cate: number;
}

export const FILTERSMultiple: Array<FilterModel> = [
    {cate: 1, type: 1, name: 'Multiple'},
    {cate: 1, type: 2, name: 'Lowest price'},
    {cate: 1, type: 3, name: 'Highest price'}
];

export class FModel {
    public min: number;
    public max: number;
    public list: Array<string> = [];

    constructor(model: any = {}) {
        this.min = model.min || 0;
        this.max = model.max || 0;
        this.list = model.list || [];
    }
}


