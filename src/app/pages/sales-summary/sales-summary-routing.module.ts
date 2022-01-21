import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesSummaryPage } from './sales-summary.page';

const routes: Routes = [
  {
    path: '',
    component: SalesSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesSummaryPageRoutingModule {}
