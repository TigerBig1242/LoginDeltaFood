import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-list-detail-history',
  templateUrl: './list-detail-history.page.html',
  styleUrls: ['./list-detail-history.page.scss'],
})
export class ListDetailHistoryPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  idOrder;
  detail = [];

  constructor(public acRoute: ActivatedRoute, public api: ApiServiceService) {
    acRoute.params.subscribe((a) => {
      this.idOrder = a;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getHistoryDetail(this.idOrder);
  }

  getHistoryDetail(idOrder) {
    let getDetail = this.s_id + '/' + idOrder['order_id'];
    this.api.get('storeGet_detail/' + getDetail).then((res: any) => {
      this.detail = this.subDate(res);
    });
  }
  //ตัดวินาทีจาก date_time
  subDate(data){
    data.forEach(element => {
      element.date_time = element.date_time.substring(0,16);
    });
    return data;
  }

  backToListHistory() {
    history.back();
  }
}

