import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  user = [];
  s_id = JSON.parse(localStorage.getItem('s_id'));
  offStatus: number;

  constructor(
    public api: ApiServiceService,
    private modalCtrl: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getStatusUser();
  }

  ionViewWillEnter() { }

  //ดึงข้อมูลของผู้ดูแลร้าน
  getStatusUser() {
    this.api.get('storeGet_employee/' + this.s_id).then((res: any) => {
      this.user = res;
      this.checkStatusEmployee(res);  
    });
  }
  // นับสถานะของผู้ดูแลร้าน
  checkStatusEmployee(data) {
    let offStatus = 0;
    data.forEach((element) => {
      if (element.m_status != 0) {
        offStatus++;
      }
    });
    this.offStatus = offStatus;
  }
  // เปิด/ปิดสถานะของผู้ดูแลร้าน
  async changeStatusUser(m_id, status) {
    if (status == '0') {
      let user = {
        m_id: m_id,
        m_status: '1',
      };
      await this.api
        .post('employeeOn_off/', user).then((res: any) => {
          this.getStatusUser();
        });
    } else {
      if (this.offStatus != 1) {
        let user = {
          m_id: m_id,
          m_status: '0',
        };
        await this.api
          .post('employeeOn_off/', user).then((res) => {
            this.getStatusUser();
          });
      } else {
        this.presentAlertConfirm(m_id);
      }
    }
  }
  // alert หากผู้ดูแลทั้งหมดปิดระบบ ร้านจะถูกปิดด้วย
  async presentAlertConfirm(m_id) {
    const alert = await this.alertController.create({
      header: 'หากสถานะผู้ดูแลระบบไม่เปิดอยู่ ระบบร้านอาหารจะถูกปิด',
      // subHeader: 'ปิดร้าน!!',
      message: 'ต้องการปิดระบบหรือไม่',
      cssClass: 'my-custom-class-alert-confirm',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.getStatusUser();
          },
        },
        {
          text: 'ตกลง',
          cssClass:'primary',
          handler: async () => {
            let user = {
              m_id: m_id,
              m_status: '0',
            };
            await this.api
              .post('employeeOn_off/', user).then((res: any) => {
                this.getStatusUser();
                if (res.flag == 1) {
                  this.api.setFireBase('store/store_id' + this.s_id + '/status_open', false, true);
                  this.api.setFireBase('homePage/change','', false);
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }
  //ปิด modal
  async close() {
    await this.modalCtrl.dismiss();
  }
}
