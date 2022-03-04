import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';
import { Storage } from '@ionic/storage';


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
    public storage: Storage,
    public api: ApiServiceService,
    private modalCtrl: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getStatusUser();
    this.getStatusEmployee();
  }

  ionViewWillEnter() { }

  //switch store manager && employee
  disPlay:number= 1;
  selectDisPlay(type) {
    if (type == 'A') {
      this.disPlay = 1;
    } else {
      this.disPlay = 0;
    }
  }

  //get data display employee
  dataEmployee:any = {store_id:0};
  employee:any = 
  { 
    // staff:{emp_img: '', emp_name:''},
  };
  getStatusEmployee() {
    this.storage.create();
    this.dataEmployee = this.api.getStorage('userLogin');
    // console.log(this.dataEmployee.data);
    
    this.api.getData('get_staff/' + this.dataEmployee.data.store_id).then((res: any) => {
      this.employee = res;
      this.checkStatusEmployee(res);
      console.log(this.employee);
    });
  }

  // switch on/off employee
  async switchEmployee(emp_id, emp_status) {
    if (emp_status == '0') {
      let users = {
        emp_id: emp_id,
        emp_status: '1',
      };
      await this.api.postData('employee_Switch/', users).then((res:any) => {
        this.getStatusEmployee();
      });
    } else {
      if (this.offStatus != 1) {
        let users = {
          emp_id: emp_id,
          emp_status: '0',
        };
        await this.api.postData('employee_Switch/', users).then((res: any) => {
          this.getStatusEmployee();
        });
      } else {
        this.presentAlertConfirm(emp_id);
      }
    }
  }

  //ดึงข้อมูลของผู้ดูแลร้าน
  getStatusUser() {
    this.api.get('storeGet_employee/' + this.s_id).then((res: any) => {
      this.user = res;
      this.checkStatusEmployee_Member(res);  
    });
  }
  // นับสถานะของผู้ดูแลร้าน
  checkStatusEmployee(data) {
    let offStatus = 0;
    data.forEach((element) => {
      if (element.emp_status != 0) {
        offStatus++;
      }
      
    });
    this.offStatus = offStatus;
  }

  checkStatusEmployee_Member(data) {
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
        this.presentAlertConfirm_Member(m_id);
      }
    }
  }
  // alert หากผู้ดูแลทั้งหมดปิดระบบ ร้านจะถูกปิดด้วย
  async presentAlertConfirm(emp_id) {
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
            this.getStatusEmployee();
          },
        },
        {
          text: 'ตกลง',
          cssClass:'primary',
          handler: async () => {
            let users = {
              emp_id: emp_id,
              emp_status: '0',
            };
            await this.api
              .postData('employee_Switch/', users).then((res: any) => {
                this.getStatusEmployee();
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
  // async close() {
  //   await this.modalCtrl.dismiss();
  // }

  async presentAlertConfirm_Member(m_id) {
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
              .postData('employeeOn_off/', user).then((res: any) => {
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
