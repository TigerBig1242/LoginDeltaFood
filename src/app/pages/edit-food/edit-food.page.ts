import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../api-service.service';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { PopupCroperComponent } from './popup-croper/popup-croper.component';
import { ActivatedRoute } from '@angular/router';
import { clear } from 'console';
import { OptionComponent } from 'src/app/component/option/option.component';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.page.html',
  styleUrls: ['./edit-food.page.scss'],
})
export class EditFoodPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  file: File = null;
  img = '';
  foodPrice: number;
  foodName: string;
  foodType: string;
  type = [];
  base64Img = '';
  flag: string;

  constructor(
    public http: HttpClient,
    public api: ApiServiceService,
    public modalController: ModalController,
    public acRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}
  foodForm = new FormGroup({
    food_name: new FormControl(),
    food_price: new FormControl(),
    typefood_id: new FormControl(),
  });

  ngOnInit() {
    this.getTypeFood();
  }

  ionViewWillEnter() {
    
  }

  //ดึงข้อมูลประเภทอาหาร
  getTypeFood() {
    this.api.get('storeGet_typeFood/' + this.s_id).then((res: any) => {
      this.type = res;
    });
  }

  //เพิ่มอาหาร
  addFood() {
    let data = {
      store_id: this.s_id,
      food_name: this.foodName,
      food_price: this.foodPrice,
      typefood_id: this.foodType,
      img: { data: this.base64Img },
    };
    this.api.post('storeAdd_food', data).then((res: any) => {
      this.flag = res.flag;
      this.presentToast();
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PopupCroperComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.base64Img = res.data;
      }
    });
  }

  backToManagement() {
    history.back();
  }

  onSubmit() {
    this.foodPrice = this.foodForm.value['food_price'];
    this.foodName = this.foodForm.value['food_name'];
    this.foodType = this.foodForm.value['typefood_id'];
  }
  //alert การเพิ่มอาหาร
  async alertConfirmSubmit(index) {
    if (
      this.foodForm.value.food_name != null &&
      this.foodForm.value.food_price != null &&
      this.foodForm.value.typefood_id != null &&
      this.base64Img != ''
    ) {
      const alert = await this.alertController.create({
        header: 'ต้องการเพิ่มอาหารหรือไม่',
        cssClass:'my-custom-class',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {},
          },
          {
            text: 'เพิ่ม',
            cssClass: 'primary',
            handler: async () => {
              await this.addFood();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.presentAlert();
    }
  }
  //alert เตือนกรอกข้อมูลไม่ครบถ้วน
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลไม่ครบถ้วน',
      cssClass:'customAlertNewType',
      message: 'โปรดกรอกข้อมูลให้เรียบร้อย',
      buttons: ['รับทราบ'],
    });

    await alert.present();
  }
  //toast การเพิ่มอาหาร
  async presentToast() {
    if (this.flag == '1') {
      const toast = await this.toastController.create({
        message: 'เพิ่มอาหารเรียบร้อย',
        duration: 3000,
        cssClass: 'customToastClass',
        color: 'dark',
      });
      toast.present();
      this.foodForm.reset();
      this.base64Img = '';
    } else {
      const toast = await this.toastController.create({
        message: 'เพิ่มอาหารไม่สำเร็จ',
        duration: 3000,
        cssClass: 'customToastClass',
        color: 'danger',
      });
      toast.present();
    }
  }
}
