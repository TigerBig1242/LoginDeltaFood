import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AlertController,
  IonSlides,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-new-typefood',
  templateUrl: './new-typefood.component.html',
  styleUrls: ['./new-typefood.component.scss'],
})
export class NewTypefoodComponent implements OnInit {
  type = [];
  s_id = JSON.parse(localStorage.getItem('s_id'));
  typeFoodName: string;
  editFoodName: string;
  newTypeFoodForm = new FormGroup({
    typeFood: new FormControl(),
  });
  editTypeFoodForm = new FormGroup({
    edittypeFood: new FormControl(),
  });
  segmentList = ['เพิ่มประเภทอาหาร', 'แก้ไขประเภทอาหาร'];
  selectedSegment: string;
  // slideList = ['Slide Add', 'Slide Edit'];
  @ViewChild('slide') slide: IonSlides;

  constructor(
    public modalCtrl: ModalController,
    public api: ApiServiceService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.selectedSegment = this.segmentList[0];
  }

  ngOnInit() {
    this.getTypeFood();
  }

  ionViewWillEnter() {}
  
  //segment
  _segmentSelected(item: string, index: number) {
    this.slide.slideTo(index);
  }
  // slide
  _ionSlideDidChange(event: any) {
    this.slide.getActiveIndex().then((index) => {
      this.selectedSegment = this.segmentList[index];
    });
  }
  //แก้ไขประเภทอาหาร
  _type_insert: any = { name: '' };
  _type_edit: any = { id: 0, name: '' };
  _pick: any = [];
  selectTypeMenu(id, type, i) {
    this._type_edit = { id: id, name: type };
    this._pick.forEach((el, index) => {
      this._pick[index].class = '';
      if (index == i) {
        this._pick[index].class = 'bg-indigo-100';
      }
    });
  }
  //ดึงประเภทอาหารจาก api
  getTypeFood() {
    this.api.get('storeGet_typeFood/' + this.s_id).then((res: any) => {
      this.type = res;
    });
  }
  //เพิ่มประเภทอาหาร
  addTypeFood() {
    let data = {
      store_id: this.s_id,
      typefood_name: this.typeFoodName,
    };
    this.api
      .post('storeAdd_typeFood', data).then((res: any) => {
        this.toastAddTypeFood(res.ms, res.flag);
      });
  }
  editTypeFood(id) {
    let data = {
      typefood_id: id,
      typefood_name: this.editFoodName,
    };
    this.api
      .post('storeEdit_typeFood', data).then((res: any) => {
        this.toastEditTypeFood(res.ms, res.flag);
        this.getTypeFood();
      });
  }
  //ลบประเภทอาหาร
  removeTypeFood(typeFood) {
    let typefood = {
      food_id: typeFood,
    };
    this.api
      .post('storeRestore_food', typefood).then((res: any) => {
        this.getTypeFood();
        this.presentToast(res.ms);
      });
  }

  onSubmit() {
    this.typeFoodName = this.newTypeFoodForm.value['typeFood'];
  }
  onSubmitEdit() {
    this.editFoodName = this.editTypeFoodForm.value['edittypeFood'];
  }
  //alert remove ประเภท
  async alertConfirmRemove(typeFood) {
    const alert = await this.alertController.create({
      header: 'ต้องการลบประเภทอาหารนี้หรือไม่',
      cssClass: 'my-custom-class-delete-new-type',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'ใช่',
          cssClass: 'primary',
          handler: async () => {
            await this.removeTypeFood(typeFood);
          },
        },
      ],
    });
    await alert.present();
  }
  //toast
  async presentToast(ms) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1000,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
  }
  //alert add ประเภท
  async alertConfirmSubmit(data) {
    if (this.newTypeFoodForm.value.typeFood != null) {
      const alert = await this.alertController.create({
        header: 'ต้องการเพิ่มประเภทอาหารนี้หรือไม่',
        cssClass: 'my-custom-class',
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
              await this.addTypeFood();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.presentAlert();
    }
  }
  async alertConfirmEdit(id) {
    if (this.editTypeFoodForm.value.edittypeFood != '') {
      const alert = await this.alertController.create({
        header: 'ยืนยันการแก้ไขประเภทอาหารนี้หรือไม่',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {},
          },
          {
            text: 'แก้ไข',
            cssClass:'primary',
            handler: async () => {
              await this.editTypeFood(id);
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.presentAlert();
    }
  }
  //alert ไม่กรอกข้อมูล
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลไม่ครบถ้วน',
      cssClass: 'customAlertNewType',
      message: 'โปรดระบุประเภทอาหารให้เรียบร้อย',
      buttons: ['รับทราบ'],
    });

    await alert.present();
  }
  async toastAddTypeFood(ms, flag) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1000,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
    if (flag == 1) {
      this.newTypeFoodForm.reset();
    }
  }
  async toastEditTypeFood(ms, flag) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1000,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
    if (flag == 1) {
      this.editTypeFoodForm.reset();
    }
  }
  //ปิด modal
  async close() {
    await this.modalCtrl.dismiss();
  }
}
