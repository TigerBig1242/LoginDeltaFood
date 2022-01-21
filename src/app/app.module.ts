import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
//import { Storage } from '@ionic/Storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyDfXeMIp8IjTmDHF7Xg0et4Jy9LW04xCok",
  authDomain: "market-5cbca.firebaseapp.com",
  databaseURL: "https://market-5cbca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "market-5cbca",
  storageBucket: "market-5cbca.appspot.com",
  messagingSenderId: "360895947212",
  appId: "1:360895947212:web:1dd1498926ab8f5f03fd69",
  measurementId: "G-VSD295B6D1"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    ImageCropperModule, 
    AngularFireModule.initializeApp(firebaseConfig, 'marketStore2'), 
    AngularFireDatabaseModule, 
    FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule { }
