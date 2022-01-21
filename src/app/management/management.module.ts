import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementPage } from './management.page';

import { ManagementPageRoutingModule } from './management-routing.module';
import { TrashComponent } from '../pages/trash/trash.component';
import { PopoverComponent } from '../component/popover/popover.component';
import { NewTypefoodComponent } from '../component/new-typefood/new-typefood.component';
import { HideheaderDirective } from '../directive/hideheader.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ManagementPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ManagementPage,TrashComponent,PopoverComponent,NewTypefoodComponent,HideheaderDirective],
  entryComponents:[TrashComponent,PopoverComponent,NewTypefoodComponent]
})
export class ManagementPageModule {}
