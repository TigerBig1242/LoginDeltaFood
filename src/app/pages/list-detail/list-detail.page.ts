import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  food = [1, 1, 1];
  idOrder;
  detail = {};
  r_id: any;
  m_id: any;
  loadFirebase = true;

  constructor(
    public acRoute: ActivatedRoute,
    public api: ApiServiceService,
    public alertController: AlertController,
    public toastController: ToastController,
    public firebase: AngularFireDatabase,
    public ref: ChangeDetectorRef
  ) {
    acRoute.params.subscribe((a) => {
      this.idOrder = a['order_id'];
      this.getFireBase();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.loadFirebase = false;
  }

  ionViewWillEnter() {}
  //get firebase เช็ค node
  getFireBase() {
    this.api.getFireBase('order/by_id/' + this.idOrder, (res: any) => {
      if (this.loadFirebase) {
        this.getDetail(this.idOrder);
      }
    });
  }
  //ดึง api รายละเอียดออเดอร์ใหม่
  getDetail(idOrder) {
    let getDetail = this.s_id + '/' + idOrder;
    this.api.get('storeOrder_inDetail/' + getDetail).then((res: any) => {
      this.detail = this.subDate(res);
      this.r_id = res.rider_id;
      this.m_id = res.m_id;
      this.ref.detectChanges();
    });
  }
  //ตัดวินาทีจาก date_time
  subDate(data) {
    data.date_time = data.date_time.substring(0, 16);
    return data;
  }

  cancelThisOrder(order) {
    let data = {
      store_id: this.s_id,
      order_id: order,
    };
    this.api.post('storeCancel_order', data).then((res: any) => {
      if (res.flag == 1) {
        this.setFireBase(order, res.data.rider_id, res.data.m_id, false);
        if (res.cancel == true) {
          this.api.setFireBase(
            'm_id/m_id' + res.data.m_id + '/check_status/status',
            res.data.status_id,
            true
          );
          this.api.setFireBase(
            'm_id/m_id' + res.data.m_id + '/check_status/order_id',
            order,
            true
          );
          this.api.setFireBase(
            'rider/rider_id' + res.data.rider_id + '/check_status/status',
            res.data.status_id,
            true
          );
          this.api.setFireBase(
            'rider/rider_id' + res.data.rider_id + '/check_status/order_id',
            order,
            true
          );
        }
        this.api.setFireBase(
          'store/store_id' + this.s_id + '/status_list',
          order,
          false
        );
        this.api.setFireBase('order/order_all', '', false);
      }
      this.presentToast(res.ms, res.flag);
    });
  }

  startCooking(order) {
    let data = {
      store_id: this.s_id,
      order_id: order,
      statusOrStore_id: 2,
    };
    this.api.post('storeStatus_order', data).then((res: any) => {
      if (res.flag == '1') {
        this.setFireBase(order, res.data.rider_id, res.data.m_id, false);
      }
      this.toastStartCooking(res.ms);
    });
  }

  setFireBase(order, rider_id, m_id, con) {
    this.api.setFireBase('order/by_id/' + order, '', con);
    this.api.setFireBase('rider/rider_id' + rider_id + '/status_list', '', con);
    this.api.setFireBase('m_id/m_id' + m_id + '/status_list', '', con);
    this.api.setFireBase('order/order_all', '', false);
  }
  async toastStartCooking(ms) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1500,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
  }

  async presentCancelConfirm(order) {
    const alert = await this.alertController.create({
      header: 'ต้องการยกเลิกรายการนี้หรือไม่',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'ยกเลิก',
          cssClass: 'primary',
          handler: async () => {
            await this.cancelThisOrder(order);
          },
        },
      ],
    });
    await alert.present();
  }
  async presentToast(ms, flag) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1500,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
    if (flag == 1) {
      setTimeout(() => {
        history.back();
      }, 2000);
    }
  }
  
  async alertConfirmOrder(order) {
    const alert = await this.alertController.create({
      header: 'เริ่มทำรายการนี้หรือไม่',
      cssClass: 'my-custom-class',
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
            await this.startCooking(order);
          },
        },
      ],
    });
    await alert.present();
  }

  backToList() {
    history.back();
  }
}
