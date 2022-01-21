import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {

  food=[];
  s_id = JSON.parse(localStorage.getItem('s_id'));

  constructor(private modalCtrl: ModalController,public api : ApiServiceService) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.getFoodInBin();
  }

  getFoodInBin(){
    this.api.get('storeGet_food_inBin/'+this.s_id).then((res:any)=>{
      this.food=res;
    });
  }

  getFoodRestore(foodId){
    let food = {
      food_id : foodId
    };
    this.api.post('storeRestore_food',food).then((res:any)=>{
      this.getFoodInBin();
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
