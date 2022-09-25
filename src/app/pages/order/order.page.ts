import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ScrollDetail} from '@ionic/core';
import {IonContent} from '@ionic/angular';
import {AuthService, OrderDetailService, OrderService} from '../../shared/fapi';
import {UserModel} from '../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {AlertProvider, AnimationProvider, LoadingProvider, PageDataService} from '../../shared';
import {SessionStorage} from 'ngx-store';


@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderPage implements OnInit {
    @SessionStorage() user: UserModel;
    @ViewChild(IonContent, {static: true}) content: IonContent;
    selectType = 'All';
    orderList: Array<any>;
    gList: Array<any>;
    isEnd = false;

    constructor(
        private loadingProvider: LoadingProvider,
        private alertProvider: AlertProvider,
        private orderService: OrderService,
        private orderDetailService: OrderDetailService,
        private pageService: PageDataService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private aProvider: AnimationProvider) {
    }

    ngOnInit() {
    }

    getList() {
        this.orderList = null;
        if (this.authService.isAuthenticated) {
            this.selectType = this.route.snapshot.paramMap.get('state') || 'All';
            this.orderService.getOrderList(this.user.uid).subscribe(r => {
                this.gList = r;
                this.orderList = this.gList;
            }, error => this.alertProvider.present(error));
        }
    }

    ionViewDidEnter() {
        this.getList();
    }

    segmentChanged(event) {
        if (this.gList) {
            this.orderList = this.selectType === 'All' ? this.gList : this.gList.filter(g => g.status === this.selectType);
        }
    }

    animation(i) {
        return this.aProvider.trackingInExpand(i);
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.isEnd = scrollTop >= 10;
        }
    }
    doRefresh(event) {
        this.getList();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    goTop() {
        this.content.scrollToTop(2000);
    }

    getStatusColor(status: string) {
        switch (status) {
            case 'finish':
                return 'success';
            case 'cancel':
                return 'danger';
            case 'delivery':
                return 'warning';
            case 'process':
                return 'twitter';
            default:
                return 'twitter';
        }
    }
}
