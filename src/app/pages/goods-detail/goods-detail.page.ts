import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {
    BagsService,
    PageDataService,
    FavoriteService,
    GoodsService,
    FavoriteModel,
    GoodsModel,
    GlobalProvider,
    LoadingProvider,
    ToastProvider,
    BagModel,
    GoodPhotoModel,
    AlertProvider,
    AuthService,
    GoodPhotoService, SizeModel, SizeService
} from '../../shared';
import {DomSanitizer} from '@angular/platform-browser';
import {IonContent} from '@ionic/angular';
import {ScrollDetail} from '@ionic/core';


@Component({
    selector: 'app-goods-detail',
    templateUrl: './goods-detail.page.html',
    styleUrls: ['./goods-detail.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsDetailPage implements OnInit {
    @ViewChild(IonContent, {static: true}) content: IonContent;
    isEnd = false;
    id: string;
    detail: GoodsModel;
    isApp = false;
    fList: Array<FavoriteModel> = [];
    photoList: Array<GoodPhotoModel>;
    selectedSize: string;
    sizeList: Array<string>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private goodService: GoodsService,
                private favoriteService: FavoriteService,
                private photoService: GoodPhotoService,
                private pageService: PageDataService,
                private bagsService: BagsService,
                private authService: AuthService,
                private sizeService: SizeService,
                private loadProvider: LoadingProvider,
                private toastProvider: ToastProvider,
                private gProvider: GlobalProvider,
                private alertProvider: AlertProvider,
                private datePipe: DatePipe,
                public sanitizer: DomSanitizer) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isApp = this.gProvider.isApp;
    }

    ngOnInit() {
        this.pageService.getList([
            this.goodService.getModel(this.id),
            this.favoriteService.getList(),
            this.photoService.getListByParam('goodId', this.id)
        ]).then(results => {
            this.detail = results[0];
            this.fList = results[1];
            this.photoList = results[2];
            this.detail.size = this.detail.hasOwnProperty('size') ? this.detail.size : 'S';
            this.sizeList = this.detail.size.split(',');
            this.selectedSize = this.sizeList[0];
            const fModel = this.fList.find(f => f.goodId === this.detail.id);
            this.detail = new GoodsModel({isBag: fModel ? true : false, ...this.detail});
        });
    }

    addFavorite(good: GoodsModel) {
        if (this.authService.isAuthenticated) {
            good.isBag = true;
            const model = new FavoriteModel();
            model.userId = this.authService.user.uid;
            model.goodId = good.id;
            model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
            this.fList.push(model);
            this.favoriteService.addModel(model).then();
        } else {
            this.alertProvider.present('please login');
        }
    }

    removeFavorite(good: GoodsModel) {
        if (!this.authService.isAuthenticated) {
            this.alertProvider.present('please login');
            return;
        }
        good.isBag = false;
        const fId = this.fList.find(f => f.goodId === good.id).id;
        this.favoriteService.delete(fId).then();
    }

    addBag(model: GoodsModel) {
        const bag = new BagModel(model);
        bag.isCheck = true;
        bag.num = 1;
        bag.name = model.name;
        bag.id = model.id;
        bag.price = model.price;
        bag.img = model.img;
        bag.size = this.selectedSize;
        this.bagsService.add(bag);
    }

    buy(model: GoodsModel) {
        this.addBag(model);
        this.router.navigateByUrl('/tabs/bags');

    }

    onSelect(size) {
        this.selectedSize = size;
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.isEnd = scrollTop >= 10;
        }
    }

    goTop() {
        this.content.scrollToTop(2000);
    }
}
