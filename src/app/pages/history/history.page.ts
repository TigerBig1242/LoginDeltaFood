import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  myDate : string = new Date().toISOString();
  list=[];
  k =[];
  
  
  constructor(
    public route: Router,
    public api: ApiServiceService,
    public acRoute: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter(){
    this. getListHistory();
  }

  getListHistory(){
    let date = this.s_id + '/' + formatDate(this.myDate, 'yyyy-MM-dd', this.locale);
    this.api.get('storeOrder_history/'+date).then((res: any)=>{
      this.list = this.subDate(res);
    })
  }
  //ตัดวินาทีจาก date_time
  subDate(data){
    data.forEach(element => {
      element.date_time = element.date_time.substring(0,16);
    });
    return data;
  }

  dateChanged(date) {
    this.getListHistory();
  }

  getHistoryDetail(id) {
    this.route.navigate(['/list-detail-history/'+id]);
  }

  backToProfile() {
    history.back();
  }
}
