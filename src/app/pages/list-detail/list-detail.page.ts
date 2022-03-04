import { EditListDetailPage } from './../edit-list-detail/edit-list-detail.page';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  food:any = [1, 1, 1];
  idOrder;
  detail:any = {};
  r_id: any;
  m_id: any;
  loadFirebase = true;
  checkDetail:any = [];
  order_id:any = {};
  constructor(
    public acRoute: ActivatedRoute,
    public api: ApiServiceService,
    public alertController: AlertController,
    public toastController: ToastController,
    public firebase: AngularFireDatabase,
    public ref: ChangeDetectorRef,
    public modalcontroller: ModalController,
    public router: Router,
    public storage: Storage
  ) {
    setTimeout(() => {
      this.itemFromStorage.sum_price = parseInt(this.itemFromStorage.sum_price);
    }, 100);

    acRoute.params.subscribe((a) => {
      this.idOrder = a['order_id'];
      this.getFireBase();
    });
  }

  ngOnInit() {
    // this.setListMenuInStorage;
  }

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
      this.food = res.food;
      this.order_id = res.order_id;
      this.ref.detectChanges();
      this.api.setStorage('menuList', this.detail.food); 
      console.log(this.detail);  
      // console.log(this.food); 
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
      this.api.setStorage('listMenu', res);
      console.log(res);
      
      this.toastStartCooking(res.ms);
    });
  }

  //Edit cooking menulist
  editCooking(order) {
    let temp = {
      order_id: this.order_id,
      food_id: this.food.food_id,
      store: this.food.store_id,
      food_name: this.food.food_name,
      food_detail: this.food.food_detail,
      amount: this.food.amount,
      sum_price: this.food.sum_price,
      food_price: this.food.food_price,
      food_status: this.food.food_status,
      orderdetail_date: this.food.orderdetail_date,
      option: this.food.option
    };
    console.log(this.order_id); 
    console.log(this.food); 
    console.log(temp); 
    //  this.api.postData('orderTemp/', temp).then((res:any) => {
    //   res = this.sumToTal(order);
    //   this.api.setStorage('menuList', res(order));
    //   console.log(res(order));
    //   this.toastStartCooking(res.ms);
    // });
    // this.api.post('storeStatus_order', data).then((res: any) => {
    //   if (res.flag == '1') {
    //     this.setFireBase(order, res.data.rider_id, res.data.m_id, false);  
    //   }
    //   this.api.setStorage('listMenu', res);
    //   console.log(res);
      
    //   this.toastStartCooking(res.ms);
    // });
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

  async alertEditOrder(order) {
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
            await this.editCooking(order);
          },
        },
      ],
    });
    await alert.present();
  }

  backToList() {
    history.back();
  }
  @Input() editlist: any = {};
  
  
  listing:any = [];
  itemFromStorage:any = [];
  editMenuFromStorage:any = {};
  async editDetail(o) {
    const modal = await this.modalcontroller.create({      
      component: EditListDetailPage,
      componentProps: {editlist: o},
      cssClass: 'my-custom-class',
    });
    
    modal.onDidDismiss().then(()=>{
      this.itemFromStorage = this.api.getStorage('menuList');
      this.detail.food = this.itemFromStorage;
       console.log(this.detail.food);           
    });
    return await modal.present();
  }

  async checkStatus_editListDetailMenu(detail) {
      const alert = await this.alertController.create({
        cssClass: 'Alerteditlistmenu',
        message: 'ยืนยันการเปลี่ยนแปลงเมนูเนื่องจากวัตถุดิบไม่เพียงพอ',
        buttons:[
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.sumToTal(detail);
              console.log(this.sumToTal(detail));    
            }
          },
          {
              text: 'ตกลง',
              cssClass: 'primary',
              handler: async () => {
                let temp = { 
                  order_id: this.order_id,
                  food_id: this.detail.food,
                  store_id: this.detail.food,
                  food_name: this.detail.food,
                  food_detail: this.detail.food,
                  amount: this.detail.food,
                  sum_price: this.detail.food,
                  food_price: this.detail.food_price,
                  food_status: this.detail.food,
                  option: this.detail.food
                };
                // let temp = {
                //   order_id: this.order_id,
                //   food_id: this.detail.food[0].food_id,
                //   store_id: this.detail.food[0].store_id,
                //   food_name: this.detail.food[0].food_name,
                //   food_detail: this.detail.food[0].food_detail,
                //   amount: this.detail.food[0].amount,
                //   sum_price: this.detail.food[0].sum_price,
                //   food_price: this.detail.food_price,
                //   food_status: this.detail.food[0].food_status,
                //   option: this.detail.food[0].option
                //   };
                  console.log(temp);  
                await this.api.postData('orderTemp/', temp).then((res:any) => {
                  res = this.sumToTal(detail);
                  this.api.setStorage('menuList', res(detail));
                  console.log(res(detail));
                });
              }
            }
          ] 
      });
        await alert.present();   
  }
  
  sumToTal(detail) {
    let total: number = 0;
    // let itemFromStorage:any = [];
    // this.storage.create();
    this.itemFromStorage = this.api.getStorage('menuList'); 
    // this.listing = this.itemFromStorage;
    // console.log(this.listing.food);
    // console.log( this.itemFromStorage);
      
    this.itemFromStorage.forEach((itemFS,index) => {
      total = total + parseInt(itemFS.sum_price);
      // // console.log(total);
        // this.itemFromStorage[index] = total; 
        // this.api.setStorage('menuList', this.itemFromStorage);
        // console.log( itemFS.sum_price);
     });   
    return total;
  }

}
