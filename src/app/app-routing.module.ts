import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule)
  // },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'list-detail-history',
    loadChildren: () => import('./pages/list-detail-history/list-detail-history.module').then( m => m.ListDetailHistoryPageModule)
  },
  {
    path: 'sales-summary',
    loadChildren: () => import('./pages/sales-summary/sales-summary.module').then( m => m.SalesSummaryPageModule)
  },
  {
    path: 'list-detail',
    loadChildren: () => import('./pages/list-detail/list-detail.module').then(m => m.ListDetailPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'edit-food',
    loadChildren: () => import('./pages/edit-food/edit-food.module').then( m => m.EditFoodPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then( m => m.DemoPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
