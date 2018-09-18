import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

/*
  Generated class for the DbworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'https://moskarcenter.com';

@Injectable()
export class DbworkProvider {

  private url:string
 
  constructor(public http: Http) {
    console.log('Hello DbworkProvider Provider');
  }

  get(query:string = ''){
    return this.http.get(apiUrl + query)
  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res);
        console.log(res);
      }, (err) =>{
        reject(err);
      });

    });

  }

  public getCategories() {
    return this.http.get(apiUrl + '/wp-json/wp/v2/categories/', {})
      .map(res => res.json());
  }

  public login(username, password): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.post(apiUrl +'/wp-json/jwt-auth/v1/token', {
      "username": username,
      "password": password
    })
    .map(res => this.getToken(res));

    return $obs;
  }

  public register(email, username, password) : Observable<any>{
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    var $obs = this.http.post(apiUrl +'/wp-json/wp/v2/users/register', {
      "email": email,
      "username": username,
      "password": password
    }, {})
      .map(res => this.getToken(res));

    return $obs;
  }

  public getToken(res) {
    return res.json().token;
  }



}
