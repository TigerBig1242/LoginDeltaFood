import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from 'src/app/api-service.service';
import { FormsModule } from '@angular/forms'; 
import { async } from '@firebase/util';

@Component({
  selector: 'app-edit-list-detail',
  templateUrl: './edit-list-detail.page.html',
  styleUrls: ['./edit-list-detail.page.scss'],
})
export class EditListDetailPage implements OnInit {

  constructor(
    public storage: Storage,
    public api: ApiServiceService,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public formModule: FormsModule
  ) { 
    setTimeout(() => {
      this.editlist.sum_price = parseInt(this.editlist.sum_price);
      this.editlist.amount = parseInt(this.editlist.amount);
      this.price = this.editlist.sum_price / this.editlist.amount;
      // console.log(typeof(this.price));
        }, 100);  
     }

  test() {
      // console.log(this.editlist.sum_price , this.list_amount);
      // return this.list_amount * this.price;
   
  }
     list:any = [];
  list_amount: any = 0;
  // totalPrice: any;
  price: number  = 0;
  itemFromStorage:any = [];
  // edit:any = {};

  ngOnInit() {
    // console.log(this.editlist);
    //this.list_amount = this.editlist.amount; 
    this.list_amount = this.editlist.amount; 
    this.price = this.editlist.sum_price;  
    // this.itemFromStorage = this.api.getStorage('menuList');
    // console.log(this.itemFromStorage.food);
    
  }
  @Input() editlist: any = {};

  async edit_Detail_List () {
    let sum_total: number;
    let itemFS = {};
    // this.editlist = {
    //   order_id: this.editlist.order_id,
    //   food_id: this.editlist.food_id,
    //   amount: this.list_amount,
    //   food_name: this.editlist.food_name,
    //   sum_price: this.price * this.list_amount
    // };
    // this.storage.create();
    this.itemFromStorage = this.api.getStorage('menuList');
    // this.list = this.itemFromStorage;
    // console.log(this.list);
    // console.log(this.itemFromStorage);  
    this.itemFromStorage.forEach((itemFS,index) => {
      if(this.editlist.food_id == itemFS.food_id){
        this.editlist.amount = this.list_amount;
        this.editlist.sum_price = this.price * this.list_amount;
        this.itemFromStorage[index] = this.editlist;

      }
    });
     const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          message:'แก้ไขเมนูเรียบร้อย',
          buttons: [
            {
              text: 'Ok',
              handler: () => { 
                this.api.setStorage('menuList',  this.itemFromStorage);
                console.log(this.itemFromStorage);
                // this.api.getData('storeOrder_inDetail_New/'+ this.itemFromStorage.food_id).then((res:any) =>{ 
                //   this.list = res;  
                //   console.log(this.list);
                // });   
                console.log('Confirm Ok');
                this.modalCtrl.dismiss();
              }
            }
          ]

        });
     
      await alert.present();
  }
  
  calculatePrice () {
    // let totalPrice;
    this.price = parseInt(this.editlist.sum_price) / parseInt(this.editlist.amount);
    // this.editlist.sum_price = parseInt(this.editlist.sum_price);
    // this.editlist.amount = parseInt(this.editlist.amount);
    
    // setTimeout(() => {
    //   console.log(typeof(this.editlist.sum_price),typeof(this.editlist.amount));
    // }, 500);    
    // this.totalPrice = this.list_amount * this.editlist.sum_price / 2 ; 
  }
  
  async close() {
    await this.modalCtrl.dismiss();
  }
}

