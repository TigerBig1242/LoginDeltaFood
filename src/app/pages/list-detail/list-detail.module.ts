import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailPageRoutingModule } from './list-detail-routing.module';

import { ListDetailPage } from './list-detail.page';
import { HideheaderDirective } from 'src/app/directive/hideheader.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailPageRoutingModule
  ],
  declarations: [ListDetailPage,HideheaderDirective]
})
export class ListDetailPageModule {}
