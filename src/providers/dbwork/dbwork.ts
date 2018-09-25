import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {ToastController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from "../woocommerce/woocommerce";
/*
  Generated class for the DbworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DbworkProvider {
  apiUrl = 'https://moskarcenter.com';
  lemonWayApi = 'https://sandbox-api.lemonway.fr/mb/lwcollect/dev/collect_json/service_json.asmx'

  constructor(public http: Http, public toastCtrl: ToastController, public storage: Storage, private WP: WoocommerceProvider) {
    console.log('Hello DbworkProvider Provider');
  }

  public send_payment() {
    return this.http.get(this.lemonWayApi)
      .map(res => res.json());
  }

  public login(username, password){
    this.http.get(this.apiUrl+'/api/auth/generate_auth_cookie/?username='+username+'&password='+password+'&insecure=cool')
    .subscribe (res => {
      console.log(res.json);
      let response = res.json();

      if(response.error) {
        this.toastCtrl.create({
          message: response.error,
          duration: 5000
        }).present();
        return;
      }

      this.storage.set("userLoginInfo", response).then( data => {
        this.toastCtrl.create({
          message : 'Bienvenue! Vous êtes Connecté!',
          duration: 3000,
          position: 'bottom'
        }).present();
      });
    });
  }

  public register(email, username, password) : Observable<any>{
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    this.http.get(this.apiUrl +'/api/get_nonce/?controller=user&method=register')
      .map(res => {
        return res.json().nonce;
      }).subscribe(
        data => {
          localStorage.setItem('nonce', data);
        }
      );
    var $obs = this.http.get(this.apiUrl +'/api/user/register/?username='+ username +'&email='+ email +'&nonce='+ localStorage.getItem('nonce') +'&display_name='+ username +'&notify=both&user_pass='+ password,
        )
      .map(res => {
        return res;
      });
    return $obs;
  }
  
  public getCountries(): Observable<any> {
    var $obs = this.http.get("https://restcountries.eu/rest/v2/all")
      .map(res => {
        return res.json();
      });
    return $obs;
  }
}
