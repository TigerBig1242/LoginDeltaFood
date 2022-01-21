import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailHistoryPageRoutingModule } from './list-detail-history-routing.module';

import { ListDetailHistoryPage } from './list-detail-history.page';
import { HideheaderDirective } from 'src/app/directive/hideheader.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailHistoryPageRoutingModule
  ],
  declarations: [ListDetailHistoryPage,HideheaderDirective]
})
export class ListDetailHistoryPageModule {}
