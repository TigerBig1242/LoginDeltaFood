import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListOrderPage } from './list-order.page';

import { ListOrderPageRoutingModule } from './list-order-routing.module';
import { HideheaderDirective } from '../directive/hideheader.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListOrderPageRoutingModule
  ],
  declarations: [ListOrderPage,HideheaderDirective]
})
export class ListOrderPageModule {}
