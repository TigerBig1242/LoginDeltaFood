import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-list-order',
  templateUrl: 'list-order.page.html',
  styleUrls: ['list-order.page.scss'],
})
export class ListOrderPage {
  orderIn = [];
  s_id = JSON.parse(localStorage.getItem('s_id'));
  pages = 0;
  maxPages: number;

  constructor(
    public route: Router,
    public api: ApiServiceService,
    public firebase: AngularFireDatabase,
    public ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.firebase_();
    this.getOrderIn();
    // this.api.setStorage('s_id', 3);
  }

  ionViewWillEnter() {}

  firebase_() {
    this.api.getFireBase(
      'store/store_id' + this.s_id + '/status_list',
      (res: any) => {
        this.orderIn = [];
        this.getOrderIn();
      }
    );
  }
  getOrderIn() {
    let s_id = JSON.parse(localStorage.getItem('s_id'));
    // console.log(s_id);
    if(s_id){
      let data = s_id + '/' + this.pages;
      this.api.get('storeOrder_in/' + data).then((res: any) => {
        if (this.orderIn) {
          res.order.forEach((element) => {
            this.orderIn.push(element);
          });
          this.orderIn = this.subDate(this.orderIn);
        } else {
          this.orderIn = res.order;
          this.orderIn = this.subDate(this.orderIn);
        }
        this.maxPages = res.count;
        this.ref.detectChanges();
      });
      localStorage.setItem('loadList',JSON.stringify(Math.ceil(Math.random()*100)));
    }
  }

  loadData(event) {
    setTimeout(() => {
      if (this.orderIn.length < this.maxPages) {
        this.pages++;
        this.getOrderIn();
      }
      if (event) {
        event.target.complete();
      }
    }, 1000);
    if (this.orderIn.length == this.maxPages) {
      event.target.disabled = true;
    }
  }

  subDate(data) {
    data.forEach((element) => {
      element.date_time = element.date_time.substring(0, 16);
    });
    return data;
  }

  getDetailOrder(orderId) {
    this.route.navigate(['/list-detail/' + orderId]);
  }

}
