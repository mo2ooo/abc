import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BannerModel, CateModel, GoodsModel, NoticeModel, SubCateModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {
    AnimationProvider,
    PageDataService,
    BannerService,
    CateService,
    CouponsService,
    GoodsService,
    SubCateService,
    NoticeService,
    AuthService
} from '../../shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
    bannerList: Array<BannerModel>;
    notice = 'Get coupon code: Get $5 Flat Rate Shipping On Select fruit Products';
    cateList: Array<CateModel>;
    goodList: Array<GoodsModel>;
    hotList: Array<GoodsModel>;
    subGoodList: Array<GoodsModel>;
    subCateList: Array<SubCateModel>;
    noticeList: Array<NoticeModel>;
    defaultSubCate: string;
    data = [1, 2];
    menuList = [
        {name: 'WOMEN', img: 'assets/img/home/women.png', url: '/pages/goods-list/WOMEN'},
        {name: 'MEN', img: 'assets/img/home/men.png', url: '/pages/goods-list/MEN'},
        {name: 'BAGS', img: 'assets/img/home/bag.png', url: '/pages/goods-list/BAGS'},
        {name: 'NEW', img: 'assets/img/home/new.png', url: '/pages/goods-list/NEW'}
    ];
    selectIndex = 0;

    constructor(private bannerService: BannerService,
                private cateService: CateService,
                private subCateService: SubCateService,
                private goodService: GoodsService,
                private couponService: CouponsService,
                private noticeService: NoticeService,
                private router: Router,
                private events: Events,
                public authService: AuthService,
                private pageService: PageDataService,
                private aProvider: AnimationProvider) {

    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.getList();

    }

    getList() {
        const list: Array<any> = [this.bannerService.getList(), this.cateService.getList(),
            this.goodService.getList(), this.subCateService.getList(), this.noticeService.getList()];
        this.pageService.getList(list).then(r => {
            this.bannerList = r[0];
            this.cateList = r[1];
            this.goodList = r[2];
            this.subCateList = r[3];
            this.noticeList = r[4];
            this.notice = this.noticeList.map(n => n.description).reduce((p, c) => p + c, '');
            this.subCateList = this.subCateList.sort((a, b) => a.sort - b.sort);
            this.subCateList = this.subCateList.slice(0, 3);
            if (this.subCateList.length > 0) {
                this.defaultSubCate = this.subCateList[0].id;
                this.subGoodList = this.goodList.filter(g => g.subCateId === this.defaultSubCate);
            }
            this.hotList = this.goodList.filter(g => g.isNew).slice(0, 10).map((g, index) => new GoodsModel({rank: ++index, ...g}));
        });
    }

    onLogin() {
        this.router.navigateByUrl('/login');
    }

    changed(event) {
        this.subGoodList = this.goodList.filter(g => g.subCateId === this.defaultSubCate);
    }

    select(i) {
        this.selectIndex = i;
    }

    animation(i) {
        return this.aProvider.flipInRight(i);
    }

    doRefresh(event) {
        this.getList();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }
}
