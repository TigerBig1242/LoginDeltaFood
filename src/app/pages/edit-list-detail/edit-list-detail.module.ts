import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditListDetailPageRoutingModule } from './edit-list-detail-routing.module';

import { EditListDetailPage } from './edit-list-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditListDetailPageRoutingModule
  ],
  declarations: [EditListDetailPage]
})
export class EditListDetailPageModule {}
