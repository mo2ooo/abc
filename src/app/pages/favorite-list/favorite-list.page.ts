import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService, FavoriteService, GoodsService} from '../../shared/fapi';
import {FavoriteModel, GoodsModel} from '../../shared/model';
import {AnimationProvider, PageDataService} from '../../shared';
import {combineLatest} from 'rxjs';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.page.html',
    styleUrls: ['./favorite-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FavoriteListPage implements OnInit {
    gList: Array<GoodsModel>;
    goodList: Array<GoodsModel>;
    fList: Array<FavoriteModel>;
    test = [1, 2, 3];

    constructor(private goodService: GoodsService,
                private favoriteService: FavoriteService,
                private pageService: PageDataService,
                private animationProvider: AnimationProvider,
                private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            combineLatest([this.goodService.getList(),
                this.favoriteService.getListByParam('userId', this.authService.user.uid)])
                .subscribe(results => {
                    this.gList = results[0];
                    this.fList = results[1];
                    this.goodList = this.gList.filter(g => this.fList.find(f => f.goodId === g.id));
                });
        }

    }

    animation(i) {
        return this.animationProvider.puffInCenter(i);
    }

}
