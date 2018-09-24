import { Component } from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";


@Component({
  templateUrl: 'details.html'
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {
    this.product = this.navParams.get("product");
    this.WooCommerce = this.WP.init();
  }

  getProduct() {
    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
      this.reviews = JSON.parse(data.body);
    }, (err) => {
      console.log(err);
    })

  }
}
