import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
/*
  Generated class for the DbworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DbworkProvider {
  apiUrl = 'https://moskarcenter.com';
  consumerKey = "ck_dcd2ac836a21068e5c645566390a70400e2a27df";
  consumerSecret = "cs_d65486c616067d1019eaf647667b10bfd1fe2225";
  lemonWayApi = 'https://sandbox-api.lemonway.fr/mb/lwcollect/dev/collect_json/service_json.asmx'
   
  constructor(public http: Http) {
    console.log('Hello DbworkProvider Provider');
  }

  public send_payment() {
    return this.http.get(this.lemonWayApi)
      .map(res => res.json());
  }

  public getCategories() {
    return this.http.get(this.apiUrl + '/wp-json/wp/v2/categories/', {})
      .map(res => res.json());
  }

  public login(username, password): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.post(this.apiUrl+'/api/auth/generate_auth_cookie/?username='+username+'&password='+password+'&insecure=cool',
     {headers: header})
    .map(res => {
      return res;
    });
    return $obs;
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

  public getBillingData(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.get(this.apiUrl +'/wp-json/wc/v2/customers/'+ localStorage.getItem('ID') +'?consumer_key='
    +this.consumerKey+'&consumer_secret='+this.consumerSecret, {headers: header})
      .map(res => {return res.json().billing;});
    return $obs;
  }

  public getProfileData(): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.get(this.apiUrl +'/wp-json/wc/v2/customers/'+ localStorage.getItem('ID') +'?consumer_key='
    +this.consumerKey+'&consumer_secret='+this.consumerSecret, {headers: header})
      .map(res => {return res;});
    return $obs;
  }

  public editProfile(profile): Observable<any> {
    let profileData = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      role: 'seller',
      billing: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        company: profile.magasin,
        address_1: profile.adresse1,
        address_2: profile.adresse2,
        city: profile.ville,
        state: profile.etat,
        postcode: profile.postcode,
        country: profile.pays,
        email: profile.email,
        phone: profile.phone
      },
      meta_data: [
        {
            key: "type_compte",
            value: "Compte Proffessionel"
        },
        {
          key: "siret",
          value: profile.siret
        }
    ],
    };
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.put(this.apiUrl +'/wp-json/wc/v2/customers/'+ localStorage.getItem('ID') +'?consumer_key='
    +this.consumerKey+'&consumer_secret='+this.consumerSecret, profileData, {headers: header})
      .map(res => {return res;});

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
