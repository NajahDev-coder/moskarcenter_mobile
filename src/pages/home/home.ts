import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbworkProvider } from '../../providers/dbwork/dbwork';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responsetxt: any;
  products: any;
  myInput?: string;

  constructor(public navCtrl: NavController,public db:DbworkProvider) {
   this.getAllProducts();
  }

  maBoutique() {
    
  }

  mesAchats() {

  }

  onSearch(event) {
    console.log(this.myInput);
    // search the input in  fields of products + categories 
  }

  notifications () {
    console.log('notification');
  }

  basket () {
    console.log('basket');
  }

  getAllProducts() {
    this.db.getAllProducts()
      .subscribe(
        data => this.products = data,
        err => console.log(err),
        () => console.log('products')
      );
  }
}
