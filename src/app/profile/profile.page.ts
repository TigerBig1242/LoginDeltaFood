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
  // accessTokenLine = 'LIFF_STORE:1656445487-YvWZj60r:accessToken'; // demo

  constructor(
    public route: Router,
    public api: ApiServiceService,
    public modalController: ModalController,
    public storage: Storage
  ) { }

  ngOnInit() {
    //this.getProfile();
    this.showData(); 
  }

  ionViewWillEnter() {
  }

  // getProfile() {
  //   this.api.get('storeProfile/' + this.s_id).then((res: any) => {
  //     this.profile = res;
  //     this.store_status = res.store_status;
  //     console.log(res);
  //   });
  // }
  getJson: any = [{ store_id: 0 }];
  vale: any = 
    { 
      get_Store: { store_image: '',store_name: '', time_on: '', store_detail: ''  },
    };
  showData() {
    this.storage.create();                             //localstorage
    this.getJson = this.api.getStorage('userLogin');
    //console.log(this.getJson.data.store_id);
    console.log(this.getJson.data);
    //this.store = this.api.getStorage('userLogin');
    //console.log(this.vale.data.store_id);
    this.api.getData('showDataStore/' + this.getJson.data.store_id).then((res: any) => {
      this.vale = res;
      this.store_status = res.store_status
      console.log(this.vale);
    });
    
    // var bb:any; 
    // this.storage.create();                                //localstorage
    // this.storage.get('userLogin').then((rep:any) => {
    //   //console.log(rep);                                      ////{
    //   this.getJson = rep;                                            ionic storage
    //   console.log(this.getJson);                                    }///////
    //   //return rep; 
    // });

    // this.api.getData(dot).then((res:any) => { 
    //   //console.log(res);

    // }); 
  }

  getSalesSummary() {
    this.route.navigate(['/sales-summary/']);
  }

  async getManageUser() {
    this.storage.create();
    this.getJson = this.api.getStorage('userLogin');
     console.log(this.getJson);

    const modal = await this.modalController.create({
      component: ManageUserComponent,
      cssClass: 'my-custom-class-manage-user',
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
    });
  }

  getHistory() {
    this.route.navigate(['/history/']);
  }

  getLogout() {
    //localStorage.removeItem(this.accessTokenLine);
    setTimeout(() => {
      // window.location.href = "https://market.deltafood.me/store"  //z-one
      window.location.href = "https://market.deltafood.me/demo/store"   //demo
      // window.location.href = "http://localhost:8100"
    }, 1000);
  }
}