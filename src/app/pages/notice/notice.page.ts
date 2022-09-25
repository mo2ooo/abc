import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ScrollDetail} from '@ionic/core';
import {
    NoticeModel,
    PageDataService,
    NoticeService,
    AnimationProvider
} from '../../shared';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.page.html',
    styleUrls: ['./notice.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NoticePage implements OnInit {
    @ViewChild(IonContent, {static: true}) content: IonContent;
    list: Array<NoticeModel>;
    isEnd = false;


    constructor(private aProvider: AnimationProvider,
                private noticeService: NoticeService) {
    }

    ngOnInit() {
        this.noticeService.getList().subscribe(r => this.list = r);
    }

    animation(i) {
        return this.aProvider.slideInBlurredBottom(i);
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
