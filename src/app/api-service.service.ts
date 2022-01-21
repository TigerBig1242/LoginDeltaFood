import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
declare var liff: any;

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  // configUrl = 'https://market.deltafood.me/api/StoreController/';  // z-one
  configUrl = 'https://market.deltafood.me/api2/StoreController/'; // demo

  // accessTokenLine = 'LIFF_STORE:1656513577-KbrXj6q4:accessToken';  // z-one
  accessTokenLine = 'LIFF_STORE:1656445487-YvWZj60r:accessToken'; // demo

  public localhost = window.location.href.indexOf('localhost') != -1;

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
    public firebase: AngularFireDatabase,
    public storage: Storage
  ) {}
  // get(uri) {

  //   return this.http.get(this.configUrl + uri);

  // }

  // post(uri, data) {
  //   return this.http.post(this.configUrl + uri, data);
  // }

  get_url(url) {
    return this.http.get(url);
  }

  getFireBase(url, func) {
    this.firebase.database.ref(url).on('value', (val: any) => {
      func(val.val());
    });
  }

  setFireBase(url: string, value: any, con: boolean) {
    if (con) {
      this.firebase.database.ref(url).set(value);
    } else {
      this.firebase.database
        .ref(url)
        .set(Math.ceil(Math.random() * 100) / 1000);
    }
  }

  removeFireBase(url: string) {
    this.firebase.database.ref(url).remove();
  }

  get(segment) {
    return new Promise((resolve, reject) => {
      let auth_token = localStorage.getItem(this.accessTokenLine);
      // let auth_token = JSON.parse(localStorage.getItem(this.accessTokenLine));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + auth_token,
      });
      this.http.get(this.configUrl + segment, { headers: headers }).subscribe(
        (res: any) => {
          if (res.logout == true) {
            localStorage.removeItem(this.accessTokenLine);
            // window.location.href = "https://market.deltafood.me/store"  // z-one
            window.location.href = 'https://market.deltafood.me/demo/store'; // demo
            // window.location.href = 'http://localhost:8100/';
          } else {
            resolve(res);
          }
        },
        (err) => {
          if (err.status == 0) {
            console.log(err);
            reject(err);
          }
          reject(err);
        }
      );
    });
  }

  post(segment, objdata) {
    return new Promise((resolve, reject) => {
      let auth_token = localStorage.getItem(this.accessTokenLine);
      // let auth_token = JSON.parse(localStorage.getItem(this.accessTokenLine));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + auth_token,
      });
      this.http
        .post(this.configUrl + segment, JSON.stringify(objdata), {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.status == 0) {
              reject(err);
            }
          }
        );
    });
  }

  postLogin(profile) {
    this.post('login', profile).then((res: any) => {
      if (res.flag == 1) {
        if (res.data.m_active == 1) {
          localStorage.setItem('s_id', JSON.stringify(res.data.store_id));
          let loadList = JSON.parse(localStorage.getItem('loadList'));
          if (!loadList) {
            window.location.reload();
          }
        } else {
          this.alertNotActive();
        }
      } else if (res.flag == 2) {
        this.alertNotStore(res.data.type_id);
      }
    });
  }

  //---------------------Login----------------------//
  async initializeLiff() {
    //demo
    let liff_id = '1656445487-YvWZj60r';
    let user_id = 'U4a5766192705c4242297af270b87a205';
    let redirectUri = 'https://market.deltafood.me/demo/store';

    //z-one
    // let liff_id = '1656513577-KbrXj6q4'
    // let user_id = 'U7a0d1f7b353ebc1ad73be81dcba74d01';
    // let redirectUri = 'https://market.deltafood.me/store'

    await liff
      .init({
        liffId: liff_id,
      })
      .then(() => {
        if (this.localhost) {
          var localhost = {
            displayName: '- TA -',
            pictureUrl:
              'https://profile.line-scdn.net/0h8fRLY9zkZ0lvNU7GKMYYHlNwaSQYG2EBF1t7KEw8O39DBygWVlN9fEI2OnwXDSlMAVoqeh0xa35F',
            statusMessage: 'Yep',
            userId: user_id,
          };
          // localStorage.setItem(
          //   'LIFF_STORE:1656513577-KbrXj6q4:accessToken',
          //   'eyJhbGciOiJIUzI1NiJ9.joS_UnBBttMmnarhv0099JPT92fhjfpWvnT_t0xB48EvOhKb_5QzX16GKpl_uVY6mzZswi__bPm6Z7AIx79XY3dJNjjrEQMrHlzttdKvvCZRy44akBm-uHG06IQIHljSQTW0lp0H6uFxqiGk6j0DeRCpNcdQ8nvE-uiz8x828Tw.30Yfi2XIP57ew4tEQ2LX7ZjcP7y8sMjePBw875JyFIs'
          // );
          localStorage.setItem(
            'LIFF_STORE:1656445487-YvWZj60r:accessToken',
            'eyJhbGciOiJIUzI1NiJ9.joS_UnBBttMmnarhv0099JPT92fhjfpWvnT_t0xB48EvOhKb_5QzX16GKpl_uVY6mzZswi__bPm6Z7AIx79XY3dJNjjrEQMrHlzttdKvvCZRy44akBm-uHG06IQIHljSQTW0lp0H6uFxqiGk6j0DeRCpNcdQ8nvE-uiz8x828Tw.30Yfi2XIP57ew4tEQ2LX7ZjcP7y8sMjePBw875JyFIs'
          );
          this.postLogin(localhost);
        } else {
          if (liff.isInClient() || liff.isLoggedIn()) {
            let profile = liff
              .getProfile()
              .then((profile) => {
                this.postLogin(profile);
              })
              .catch((err) => {
                console.log('error', err);
              });
          } else {
            liff.login({ redirectUri: redirectUri });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async alertNotActive() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class-alert-login',
      header: 'ระงับการใช้งาน!!!',
      backdropDismiss: false,
      message: 'ผู้ใช้ของคุณถูกระงับการใช้งาน',
    });
    await alert.present();
  }

  async alertNotStore(type_id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class-alert-login',
      header: 'เข้าสู่ระบบไม่ถูกต้อง!!!',
      backdropDismiss: false,
      message: 'บัญชีของคุณไม่สามารถใช้งานในระบบนี้ได้',
      buttons: [
        {
          text: 'ไปยังระบบที่ใช้งานได้',
          handler: async () => {
            await this.checkUser(type_id);
          },
        },
      ],
    });
    await alert.present();
  }

  async checkUser(type_id) {
    if (type_id == 3) {
      // window.location.href = 'https://market.deltafood.me/rider';
      window.location.href = 'https://market.deltafood.me/demo/rider';
    } else {
      // window.location.href = 'https://market.deltafood.me/user';
      window.location.href = 'https://market.deltafood.me/demo/user';
    }
  }

  // login API

  getData(segment) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      this.http.get(this.configUrl + segment, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            console.log(err);
            reject(err);
          }
          reject(err);
        });
    });
  }

  postData(segment, objdata) {
    return new Promise((resolve, reject) => {
      this.http.post(this.configUrl + segment, JSON.stringify(objdata))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            reject(err);
          }
        });
    });
  }

  // set and get storage

  setStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val)); //localstorage
    // this.storage.create();
    // this.storage.set(key, val);
  }

  getStorage(demo) {
    return JSON.parse(localStorage.getItem(demo)); //localstorage
    
    //var bb:any;                                   
    //console.log(demo);                                ////{
    // this.storage.create();                                 ionic storage
    // this.storage.get(demo).then((rep:any) => {     
    //   //console.log(rep);
    //   //bb = rep;
    //   //return rep;                                        }///////
    // });
    //return bb;                                          
  }
}
