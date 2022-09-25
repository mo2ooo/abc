import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    CateModel,
    GoodsModel,
    SubCateModel,
    BagsService,
    PageDataService,
    GoodsService,
    CateService,
    SubCateService,
    BagModel, ToastProvider
} from '../../shared';

@Component({
    selector: 'app-goods-list',
    templateUrl: './goods-list.page.html',
    styleUrls: ['./goods-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsListPage implements OnInit {
    isActive = false;
    list: Array<GoodsModel>;
    gList: Array<GoodsModel>;
    cateList: Array<CateModel>;
    gSubList: Array<SubCateModel>;
    subList: Array<SubCateModel>;
    bagList: Array<BagModel>;
    cate: string;
    selectCate: string;
    selectedSubCate: string;
    animationClass = 'fade-in-bottom';
    isDetail = false;

    constructor(private route: ActivatedRoute,
                private goodService: GoodsService,
                private cateService: CateService,
                private subService: SubCateService,
                private pageService: PageDataService,
                private toastProvider: ToastProvider,
                private bagsService: BagsService) {
        this.cate = this.route.snapshot.paramMap.get('cateId') || 'WOMEN';
    }

    ngOnInit() {
        this.getList();
    }

    toggle() {
        this.isActive = !this.isActive;
    }

    getList() {
        this.pageService.getList([this.cateService.getList(),
            this.subService.getList(),
            this.goodService.getList()]).then(results => {
            if (results) {
                this.cateList = results[0];
                this.gSubList = results[1];
                this.gList = results[2];
                this.gList.forEach(g => {
                    g.selectSizeIndex = 0;
                });
                this.cateList = this.cateList.sort((a, b) => a.sort - b.sort);
                this.selectCate = this.cateList.find(c => c.name.includes(this.cate)).id;
                this.subList = this.gSubList.filter(sub => sub.cateId === this.selectCate);
                this.subList = this.subList.sort((a, b) => a.sort - b.sort);
                if (this.subList.length > 0) {
                    this.selectedSubCate = this.subList[0].id;
                }
                this.bagList = this.bagsService.getList();
                this.list = this.gList.filter(g => g.subCateId === this.selectedSubCate);
                if (this.bagList) {
                    this.bagList.map(c => {
                        const index = this.list.findIndex(g => g.id === c.id);
                        this.list[index] = new GoodsModel({isBag: true, ...this.list[index]});
                    });
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    search(event) {
        const key = event.target.value;
        this.list = this.gList.filter(item => item.name.toLowerCase().includes(key.toString().toLowerCase()));
    }

    onSelect(cateId) {
        this.selectedSubCate = cateId;
        this.list = this.gList.filter(g => g.subCateId === cateId);
    }

    addCart(event, good: GoodsModel) {
        good.isBag = true;
        event.stopPropagation();
        const bag = new BagModel();
        bag.num = 1;
        bag.isCheck = true;
        bag.img = good.img;
        bag.price = good.price;
        bag.name = good.name;
        bag.id = good.id;
        bag.size = good.hasOwnProperty('size') ? good.selectSize ? good.selectSize : 'S' : 'S';
        this.bagsService.add(bag);
        this.toastProvider.show('Add to Bag Success!');
    }

    removeCart(event, good: GoodsModel) {
        good.isBag = false;
        event.stopPropagation();
        this.bagsService.remove(good.id, good.size);
    }

    onSelectSize(event, good, i, size) {
        event.stopPropagation();
        good.selectSizeIndex = i;
        good.selectSize = size;
    }

    segmentChanged(event) {
        this.subList = this.gSubList.filter(sub => sub.cateId === this.selectCate);
        this.subList = this.subList.sort((a, b) => a.sort - b.sort);
        if (this.subList.length > 0) {
            this.selectedSubCate = this.subList[0].id;
            this.list = this.gList.filter(g => g.subCateId === this.selectedSubCate);
        }
    }

    doRefresh(event) {
        this.getList();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
