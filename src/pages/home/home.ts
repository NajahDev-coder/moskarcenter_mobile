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
   this.getCategories();
  }

  myPage(){
    this.navCtrl.setRoot(HomePage);
  }

  getCategories() {
    this.db.getCategories()
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('categories')
      );
  }
}
