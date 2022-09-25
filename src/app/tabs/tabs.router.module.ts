import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../shared';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'goods-list',
                loadChildren: () => import('../pages/goods-list/goods-list.module').then(m => m.GoodsListPageModule)
            },
            {
                path: 'order',
                loadChildren: () => import('../pages/order/order.module').then(m => m.OrderPageModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'bags',
                loadChildren: () => import('../pages/bags/bags.module').then(m => m.BagsPageModule)
            },
            {
                path: 'my',
                loadChildren: () => import('../pages/my/my.module').then(m => m.MyPageModule)
            }
        ]
    },
    {
        path: '', redirectTo: '/tabs/home', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
