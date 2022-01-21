import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ManageUserComponent } from '../pages/manage-user/manage-user.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
  ],
  declarations: [ProfilePage,ManageUserComponent],
  entryComponents:[ManageUserComponent]
})
export class ProfilePageModule {}
