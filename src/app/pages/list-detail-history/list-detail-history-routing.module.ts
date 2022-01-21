import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDetailHistoryPage } from './list-detail-history.page';

const routes: Routes = [
  {
    path: ':order_id',
    component: ListDetailHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailHistoryPageRoutingModule {}
