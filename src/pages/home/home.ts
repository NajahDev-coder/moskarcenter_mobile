import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbworkProvider } from '../../providers/dbwork/dbwork';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responsetxt: any;

  constructor(public navCtrl: NavController,public db:DbworkProvider) {
   
   }

  myPage(){
    this.navCtrl.setRoot(HomePage);
  }
}
