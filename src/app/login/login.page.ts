import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { url } from 'inspector';

//import { AlertController } from '@ionic/angular';
//import { data } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {username: '', password: ''};
  notiFicaTion: any = [];
  demo: any = '';
  //reDirectTo: any;

  constructor(
    public modalCtrl: ModalController,
    public api: ApiServiceService,
    public Storage: Storage,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

  }
  
  getLogin() {
    //console.log(this.login);
    
    //alert(456);
    if (this.login != '') {   
          this.api.postData("userLogin", this.login).then((res:any) => { 
            if (res.flag == 0 ) {
                //alert("login not success"); 
                this.alertController.create({
                  cssClass: 'my-custom-class',
                  // header: 'login not success.',
                  // subHeader: 'login not success.',
                  message: 'login not success.',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.login = {username: '', password: ''};
                        console.log(this.login);
                        //this.login = '';
                        //console.log(this.login);
                        // console.log('Confirm Ok');
                      }
                  }
                ]
                }).then(op => {
                  op.present(); 
                });
            } else { 
              this.api.setStorage("userLogin", this.login);
                //alert("login success");  
                this.alertController.create({
                  cssClass: 'my-custom-class',
                  // header: 'Alert.',
                  // subHeader: 'Subtitle.',
                  message: 'login success.',
                  buttons: [
                    {
                      text: 'Ok',
                      handler: () => {
                        this.reDirectTo();
                        console.log('Confirm Ok');
                        this.login = {username: '', password: ''};
                        //this.api.setStorage("userLogin", this.login);
                      }
                    }
                  ]
                }).then(op => {
                  op.present(); 
                });
            }
            // console.log(res);
            // this.notiFicaTion = res;
            this.api.setStorage("userLogin", res);
          });  
    } 
     //console.log(this.login);
     //this.api.setStorage("userLogin", this.api.postData("login", this.login));
     //console.log(this.api.getStorage(this.api.postData("saveData", this.login)));
     
    }
    reDirectTo() { 
      this.router.navigateByUrl('/list-order');
     }  
  
}
