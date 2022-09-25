import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CateRelationService, CateService, SubCateService} from '../../shared/fapi';
import {CateModel, CateRelationModel, SubCateModel, SubCateRelationViewModel} from '../../shared/model';
import {AnimationProvider, PageDataService} from '../../shared';

@Component({
    selector: 'app-cate',
    templateUrl: './cate.page.html',
    styleUrls: ['./cate.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CatePage implements OnInit {
    selectedCate: string;
    cateList: Array<CateModel>;
    subList: Array<SubCateModel>;
    relationList: Array<CateRelationModel>;
    gList: Array<SubCateRelationViewModel>;

    constructor(private cateService: CateService,
                private subCateService: SubCateService,
                private cRelationService: CateRelationService,
                private pageService: PageDataService,
                private aProvider: AnimationProvider) {
    }

    ngOnInit() {
        this.getList();
    }

    onSelect(cateId) {
        this.selectedCate = cateId;
        this.subList = this.gList.filter(g => g.cateId === cateId);
    }

    getList() {
        const list: Array<any> = [this.cateService.getList(), this.subCateService.getList(),
            this.cRelationService.getList()];
        this.pageService.getList(list).then(r => {
            this.cateList = r[0];
            this.cateList = this.cateList.sort((a, b) => a.sort - b.sort);
            this.selectedCate = this.cateList[0].id;
            this.subList = r[1];
            this.relationList = r[2];
            this.gList = this.relationList.map(rl => {
                const sub = this.subList.find(s => s.id === rl.subCateId);
                return new SubCateRelationViewModel({cateId: rl.cateId, ...sub});
            });
            this.gList = this.gList.filter(g => g.name !== undefined);
            this.subList = this.gList.filter(g => g.cateId === this.selectedCate);
        });
    }


    animation(i) {
        return this.aProvider.flipInTop(i);
    }



}
