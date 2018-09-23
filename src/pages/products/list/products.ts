import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { DbworkProvider } from "../../../providers/dbwork/dbwork";
import { Storage } from '@ionic/storage';
import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  WooCommerce: any;
  products: any[];

  constructor(public navCtrl: NavController, public storage: Storage,
              private db: DbworkProvider, private toastCtrl:ToastController,
              public events: Events, private WP: WoocommerceProvider) {
    this.getProducts();
  }

  getProducts() {
    this.WooCommerce = this.WP.init();
    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body);
      console.log(this.products);
    }, (err) => {
      console.log(err.message);
    });
  }

}
