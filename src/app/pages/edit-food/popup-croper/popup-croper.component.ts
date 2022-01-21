import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-popup-croper',
  templateUrl: './popup-croper.component.html',
  styleUrls: ['./popup-croper.component.scss'],
})
export class PopupCroperComponent implements OnInit {
  url = '';
  flag: string;
  constructor(
    public api: ApiServiceService,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  imageChangedEvent: any = '';
  croppedImage: any = '';
  image: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  
  async close() {
    await this.modalCtrl.dismiss();
  }
  async alertConfirmSubmit() {
    const alert = await this.alertController.create({
      header: 'ต้องการบันทึกรูปภาพนี้หรือไม่',
      cssClass:'my-custom-class',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'บันทึก',
          cssClass:'primary',
          handler: async () => {
            await this.presentToast();
          },
        },
      ],
    });
    await alert.present();
  }
  async presentToast() {
      const toast = await this.toastController.create({
        message: 'บันทึกรูปภาพเรียบร้อย',
        duration: 1000,
        cssClass: 'customToastClass',
        color: 'dark',
      });
      toast.present();
      await this.modalCtrl.dismiss(this.croppedImage);
  }
}
