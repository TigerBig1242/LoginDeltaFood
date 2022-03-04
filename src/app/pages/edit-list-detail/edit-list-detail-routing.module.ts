import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditListDetailPage } from './edit-list-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EditListDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditListDetailPageRoutingModule {}
