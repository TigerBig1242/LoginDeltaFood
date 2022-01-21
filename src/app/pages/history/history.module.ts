import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HideheaderDirective } from 'src/app/directive/hideheader.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule
  ],
  declarations: [HistoryPage,HideheaderDirective]
})
export class HistoryPageModule {}
