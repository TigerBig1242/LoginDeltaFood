import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {
  getJson: any = { };
  store: any = {};
  vale: any;
  constructor( public api: ApiServiceService,
               public storage: Storage    
    ) { }

  ngOnInit() {
    this.showData();
    // setTimeout(() => {
    //   this.hhhh();
    // }, 500);
  }

  showData() {
    this.storage.create();                             //localstorage
    this.getJson = this.api.getStorage('userLogin');
    //console.log(this.getJson.data.store_id);
    
    //this.store = this.api.getStorage('userLogin');
    console.log(this.getJson.data.store_id);
    this.api.getData('showDataStore/' + this.getJson.data.store_id).then((res:any) => {
      console.log(res);
      this.vale = res;
    });
    // var bb:any; 
    // this.storage.create();                                //localstorage
    // this.storage.get('userLogin').then((rep:any) => {
    //   //console.log(rep);                                      ////{
    //   this.getJson = rep;                                            ionic storage
    //   console.log(this.getJson);                                    }///////
    //   //return rep; 
    // });
    
    // this.api.getData(dot).then((res:any) => { 
    //   //console.log(res);
      
    // }); 
  }

  // hhhh() {
  //   console.log(this.vale);
    
  // }
}

