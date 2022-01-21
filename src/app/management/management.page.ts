import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { NewTypefoodComponent } from '../component/new-typefood/new-typefood.component';
import { PopoverComponent } from '../component/popover/popover.component';
import { ManageUserComponent } from '../pages/manage-user/manage-user.component';
import { TrashComponent } from '../pages/trash/trash.component';

@Component({
  selector: 'app-management',
  templateUrl: 'management.page.html',
  styleUrls: ['management.page.scss'],
})
export class ManagementPage {
  foodList = [];
  storeStatus = 1;
  storeName;
  statusStore: boolean;
  s_id = JSON.parse(localStorage.getItem('s_id'));

  constructor(
    public route: Router,
    public api: ApiServiceService,
    public alertController: AlertController,
    public modalController: ModalController,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.getNameStore();
    this.getListFood();
    this.getFireBase();
    this.getStatusStore();
  }

  ionViewWillEnter() {
    // this.getStatusStore();
  }
  getFireBase() {
    this.api.getFireBase('store/store_id' + this.s_id + '/status_open', (res: any) => {
      this.getStatusStore();
    });
  }
  //ดึงเมนูอาหาร
  getListFood() {
    this.api.get('storeGet_listFood/' + this.s_id).then((res: any) => {
      this.foodList = res;
    });
  }
  //ดึงชื่อร้านอาหาร
  getNameStore() {
    this.api.get('storeProfile/' + this.s_id).then((res: any) => {
      this.storeName = res.store_name;
    });
  }
  //ดึงสถานะร้านอาหาร เปิด/ปิด
  getStatusStore() {
    this.api.get('storeGet_status/' + this.s_id).then((res: any) => {
      if (res[0].store_status == 1) {
        this.statusStore = true;
      } else {
        this.statusStore = false;
      }
      this.api.setFireBase('store/store_id' + this.s_id + '/status_open', this.statusStore, true);
      this.api.setFireBase('homePage/change', '', false);
    });
  }

  //เปลี่ยนสถานะร้าน เปิด/ปิด
  changeStatusStore() {
    if (this.statusStore == true) {
      this.storeStatus = 1;
    } else {
      this.storeStatus = 0;
    }
    this.sendStatusStore();
  }

  //เปลี่ยนสถานะอาหาร เปิด/ปิด
  async changeStatusFood(event, status, food_id) {
    event.preventDefault(); //stop event ไม่ให้วิ่งขึ้นข้างบน
    if (status == '0') {
      let food = {
        food_id: food_id,
        status: '1',
      };
      await this.api
        .post('storeStatus_food/', food).then((res: any) => {
          this.getListFood();
        });
    } else {
      let food = {
        food_id: food_id,
        status: '0',
      };
      await this.api
        .post('storeStatus_food/', food).then((res) => {
          this.getListFood();
        });
    }
  }

  //post เปลี่ยนสถานะร้าน
  async sendStatusStore() {
    const store = {
      store_id: this.s_id,
      store_status: this.storeStatus,
    };
    await this.api
      .post('storeChange_status', store).then((res: any) => {
        if (res.flag == 0) {
          this.statusStore = false;
          this.alertNotOpenStore();
        }
        this.api.setFireBase('store/store_id' + this.s_id + '/status_open', this.statusStore, true);
      });
  }
  //ลบอาหาร
  async deleteMenu(food) {
    const remove = {
      food_id: food,
    };
    await this.api
      .post('storeRemove_food', remove).then((res) => {
        this.getListFood();
      });
  }
  //alert เตือนการลบอาหาร
  async presentAlertDelete(foodId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ต้องการลบเมนูนี้หรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'ลบ',
          cssClass:'primary',
          handler: () => {
            this.deleteMenu(foodId);
          },
        },
      ],
    });

    await alert.present();
  }
  //modal จัดการ user
  async getManageUser() {
    const modal = await this.modalController.create({
      component: ManageUserComponent,
      cssClass: 'my-custom-class-manage-user',
      backdropDismiss: false,
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {

    });
  }
  //modal เมนูอาหารที่ลบไปแล้ว
  async getHistoryTrash() {
    const modal = await this.modalController.create({
      component: TrashComponent,
      cssClass: 'my-custom-class-manage-user',
      backdropDismiss: false,

    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.getListFood();
    });
  }
  //popover เลือกเพิ่มอาหารหรือประเภทอาหาร
  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class-popover',
      event: ev,
      mode: 'ios',
    });
    await popover.present();
    popover.onDidDismiss().then((res) => {
      if (res.data) {
        if (res.data.item == 'เพิ่มอาหาร') {
          this.getAddFood();
        } else if (res.data.item == 'เพิ่มประเภทอาหาร') {
          this.addNewFoodType();
        }
      }
    });
  }
  //modal เพิ่มประเภทอาหาร
  async addNewFoodType() {
    const modal = await this.modalController.create({
      component: NewTypefoodComponent,
      cssClass: 'my-custom-class-new-foodtype',
      backdropDismiss: false,
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.getListFood();
    });
  }
  //alert เปิดร้านไม่สำเร็จ
  async alertNotOpenStore() {
    const alert = await this.alertController.create({
      header: 'ไม่สามารถเปิดร้านได้',
      cssClass:'my-custom-class',
      message: 'โปรดตรวจสอบสถานะผู้ดูแลร้าน',
      buttons: [
        {
          text: 'รับทราบ',
          cssClass:'primary',
          handler: () => {
            this.getManageUser();
          },
        },
      ],
    });

    await alert.present();
  }
  //แก้ไขอาหาร
  editMenu(food_id) {
    this.route.navigate(['/edit/' + food_id]);
  }
  //ไปที่หน้าเพิ่มอาหาร
  getAddFood() {
    this.route.navigate(['/edit-food/']);
  }

}
