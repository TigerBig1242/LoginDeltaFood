import { Storage } from '@ionic/storage-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { ManageUserComponent } from '../pages/manage-user/manage-user.component';
declare var liff: any;


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  profile = {};
  store_status: any;
  myDate = new Date();

  // accessTokenLine = 'LIFF_STORE:1656513577-KbrXj6q4:accessToken';  // z-one
  accessTokenLine = 'LIFF_STORE:1656445487-YvWZj60r:accessToken'; // demo

  constructor(
    public route: Router,
    public api: ApiServiceService,
    public modalController : ModalController,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  ionViewWillEnter() {
  }

  getProfile() {
    this.api.get('storeProfile/' + this.s_id).then((res: any) => {
      this.profile = res;
      this.store_status = res.store_status;
      console.log(res);
    });
  }

  getSalesSummary() {
    this.route.navigate(['/sales-summary/']);
  }

  async getManageUser() {
    const modal = await this.modalController.create({
      component: ManageUserComponent,
      cssClass: 'my-custom-class-manage-user',
      backdropDismiss:false
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
    });
  }

  getHistory() {
    this.route.navigate(['/history/']);
  }

  getLogout() {
      localStorage.removeItem(this.accessTokenLine);
      setTimeout(() => {
        // window.location.href = "https://market.deltafood.me/store"  //z-one
        window.location.href = "https://market.deltafood.me/demo/store"   //demo
        // window.location.href = "http://localhost:8100"
      }, 1000);
  }
}