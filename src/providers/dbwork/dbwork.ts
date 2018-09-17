import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the DbworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'https://moskarcenter.com/PHP-Slim-Restful/api/index.php/';

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
}
