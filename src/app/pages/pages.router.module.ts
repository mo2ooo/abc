import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared';

const routes: Routes = [
    {
        path: 'goods-list/:cateId',
        loadChildren: () => import('../pages/goods-list/goods-list.module').then(m => m.GoodsListPageModule)
    },
    {
        path: 'goods-detail/:id',
        loadChildren: () => import('../pages/goods-detail/goods-detail.module').then(m => m.GoodsDetailPageModule)
    },
    {
        path: 'coupon/:id',
        loadChildren: () => import('../pages/coupon/coupon.module').then(m => m.CouponPageModule)
    },
    {
        path: 'settle',
        loadChildren: () => import('../pages/settle/settle.module').then(m => m.SettlePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'my-address',
        loadChildren: () => import('../pages/my-address/my-address.module').then(m => m.MyAddressPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'order/:state',
        loadChildren: () => import('../pages/order/order.module').then(m => m.OrderPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'address-list',
        loadChildren: () => import('../pages/address-list/address-list.module').then(m => m.AddressListPageModule),
        canActivate: [AuthGuard]
    }, {
        path: 'card',
        loadChildren: () => import('../pages/card/card.module').then(m => m.CardPageModule),
        canActivate: [AuthGuard]
    }
    , {
        path: 'notice',
        loadChildren: () => import('../pages/notice/notice.module').then(m => m.NoticePageModule)
    }, {
        path: 'favorite-list',
        loadChildren: () => import('../pages/favorite-list/favorite-list.module').then(m => m.FavoriteListPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'coupon-list',
        loadChildren: () => import('../pages/coupon-list/coupon-list.module').then(m => m.CouponListPageModule)
    },
    {
        path: 'order-detail/:id',
        loadChildren: () => import('../pages/order-detail/order-detail.module').then(m => m.OrderDetailPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
