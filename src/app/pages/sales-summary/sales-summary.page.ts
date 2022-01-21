import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.page.html',
  styleUrls: ['./sales-summary.page.scss'],
})
export class SalesSummaryPage implements OnInit {
  s_id = JSON.parse(localStorage.getItem('s_id'));
  myDate: string = new Date().toISOString();
  saleSum = [];
  sumPrice = 0;
  amount = 0;

  constructor(
    public route: Router,
    @Inject(LOCALE_ID) private locale: string,
    public api: ApiServiceService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getSumSales();
  }

  backToProfile() {
    history.back();
  }

  getSumSales() {
    let date =
      this.s_id + '/' + formatDate(this.myDate, 'yyyy-MM-dd', this.locale);
    this.api.get('storeSales_summary/' + date).then((res: any) => {
      this.saleSum = res;
      this.calSumPrice();
    });
  }

  dateChanged(date) {
    this.getSumSales();
  }

  calSumPrice() {
    this.sumPrice = 0;
    this.amount = 0;
    this.saleSum.forEach((element) => {
      this.sumPrice = this.sumPrice + Number(element.sum_price);
      this.amount = this.amount + Number(element.amount);
    });
  }
}
