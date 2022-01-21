import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFoodPageRoutingModule } from './edit-food-routing.module';

import { EditFoodPage } from './edit-food.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PopupCroperComponent } from './popup-croper/popup-croper.component';
import { OptionComponent } from 'src/app/component/option/option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFoodPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  declarations: [EditFoodPage,PopupCroperComponent,OptionComponent],
  entryComponents: [OptionComponent]
})
export class EditFoodPageModule {}
