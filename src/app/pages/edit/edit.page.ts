import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../../api-service.service';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { PopupCroperComponent } from '../edit-food/popup-croper/popup-croper.component';
import { OptionComponent } from 'src/app/component/option/option.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  file: File = null;
  img = '';
  foodPrice: number;
  foodName: string;
  foodType: string;

  path;
  nameFood: string;
  priceFood: number;
  idFood: string;
  typeFood: string;
  imgFood = '';
  imgName = '';

  employee = [];
  // urlImg='';
  roleImg = '';
  flag: string;
  option = [];
  checkUpload: boolean = false;

  constructor(
    public http: HttpClient,
    public api: ApiServiceService,
    public acRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    acRoute.params.subscribe((a) => {
      this.path = a['food_id'];
    });
  }
  foodForm = new FormGroup({
    food_name: new FormControl(),
    food_price: new FormControl(),
    typefood_id: new FormControl(),
  });

  ngOnInit() {
    this.getFoodForEdit();
    this.getTypeFood();
  }

  ionViewWillEnter() {}
  backToManagement() {
    history.back();
  }
  //modal cropรูป
  async presentModal() {
    const modal = await this.modalController.create({
      component: PopupCroperComponent,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.imgName = res.data;
        this.checkUpload = true;
      }
    });
  }

  async getOptionModal() {
    if (!this.option) {
      const modal = await this.modalController.create({
        component: OptionComponent,
        cssClass: 'my-custom-class-options',
      });
      await modal.present();
      modal.onDidDismiss().then((res) => {
        if (res.data != null || undefined) {
          this.option = res.data;
        }
      });
    } else {
      const modal = await this.modalController.create({
        component: OptionComponent,
        cssClass: 'my-custom-class-options',
        componentProps: {
          option: this.option,
        },
      });
      await modal.present();
      modal.onDidDismiss().then((res) => {
        if (res.data != null || undefined) {
          this.option = res.data;
        }
      });
    }
  }
  //ดึงข้อมูลอาหารที่จะแก้ไข
  getFoodForEdit() {
    let food = this.s_id + '/' + this.path;
    this.api.get('storeGet_foodId/' + food).then((res: any) => {
      this.nameFood = res[0].food_name;
      this.priceFood = res[0].food_price;
      this.idFood = res[0].food_id;
      this.typeFood = res[0].typefood_id;
      this.imgName = res[0].imageUrl;
      this.option = res[0].option;
    });
  }
  //ดึงข้อมูลประเภทอาหาร
  getTypeFood() {
    this.api.get('storeGet_typeFood/' + this.s_id).then((res: any) => {
      this.employee = res;
    });
  }
  //ส่งการแก้ไขข้อมูลอาหาร
  async updateEditFood() {
    if (this.checkUpload) {
      let data = {
        food_id: this.path,
        food_name: this.foodName,
        food_price: this.foodPrice,
        typefood_id: this.foodType,
        img: { data: this.imgName },
        option: this.option,
      };
      await this.api.post('storeEdit_food/', data).then((res: any) => {
        this.flag = res.flag;
      });
    } else {
      let data = {
        food_id: this.path,
        food_name: this.foodName,
        food_price: this.foodPrice,
        typefood_id: this.foodType,
        img: null,
        option: this.option,
      };
      await this.api.post('storeEdit_food/', data).then((res: any) => {
        this.flag = res.flag;
      });
    }
  }

  onSubmit() {
    this.foodName = this.foodForm.value['food_name'];
    this.foodPrice = this.foodForm.value['food_price'];
    this.foodType = this.foodForm.value['typefood_id'];
  }

  async alertConfirmEdit(index) {
    if (
      this.foodForm.value.food_name != null &&
      this.foodForm.value.food_price != null &&
      this.foodForm.value.typefood_id != null &&
      this.imgName != ''
    ) {
      const alert = await this.alertController.create({
        header: 'ต้องการบันทึกรายการนี้หรือไม่',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {},
          },
          {
            text: 'บันทึก',
            cssClass: 'primary',
            handler: async () => {
              await this.updateEditFood();
              this.presentToast();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลไม่ครบถ้วน',
      cssClass: 'customAlertNewType',
      message: 'โปรดกรอกข้อมูลให้เรียบร้อย',
      buttons: ['รับทราบ'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'บันทึกข้อมูลเรียบร้อย',
      duration: 3000,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
  }
}
