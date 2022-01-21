import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { OptionComponent } from 'src/app/component/option/option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditPage,OptionComponent],
  entryComponents:[OptionComponent]
})
export class EditPageModule {}
