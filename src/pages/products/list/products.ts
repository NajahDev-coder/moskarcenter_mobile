import { Component } from '@angular/core';
import { NavController,ToastController, Events, NavParams } from 'ionic-angular';
import { DbworkProvider } from "../../../providers/dbwork/dbwork";
import { Storage } from '@ionic/storage';
import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";
import { AddProductPage } from '../add/addProduct';
import { ProductDetailsPage } from '../details/details';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  WooCommerce: any;
  products: any[];
  page: number;

  constructor(public navCtrl: NavController, public storage: Storage,
              public navParams: NavParams, private toastCtrl:ToastController,
              public events: Events, private WP: WoocommerceProvider) {
                this.WooCommerce = this.WP.init();
                if (this.navParams.get('category')) {
                  this.get_products_by_category(this.navParams.get('category'));
                } else {
                  this.getProducts();
                }
                
  }

  get_products_by_category(category) {
    this.WooCommerce.getAsync("products/?filter[category]=" + category.slug).then( (data) => {
      this.products = JSON.parse(data.body);
      console.log(this.products);
    }, (err) => {
      console.log(err.message);
    });
  }

  loadMoreProducts(event) {
    this.page++;
    this.WooCommerce.getAsync("products?filter[category]=" + this.navParams.get('category').slug + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products)
      console.log(this.products);
      event.complete();

      if (temp.length < 10)
        event.enable(false);
    })
  }

  getProducts() {
    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err.message);
    });
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product} );
  }

  addProduct() {
    this.navCtrl.push(AddProductPage);
  }

}
