import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesSummaryPageRoutingModule } from './sales-summary-routing.module';

import { SalesSummaryPage } from './sales-summary.page';
import { HideheaderDirective } from 'src/app/directive/hideheader.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesSummaryPageRoutingModule
  ],
  declarations: [SalesSummaryPage,HideheaderDirective]
})
export class SalesSummaryPageModule {}
