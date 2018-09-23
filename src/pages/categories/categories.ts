import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { Storage } from '@ionic/storage';
import {WoocommerceProvider} from "../../providers/woocommerce/woocommerce";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  WooCommerce: any;
  categories: any[];
  searchQuery: string = "";

  constructor(public navCtrl: NavController, public storage: Storage,
              private db: DbworkProvider, private toastCtrl:ToastController,
              public events: Events, private WP: WoocommerceProvider) {
    this.getCategories();
  }

  getCategories() {

    this.WooCommerce = this.WP.init();


    this.WooCommerce.getAsync("products/categories").then( (data) => {
      this.categories = JSON.parse(data.body);
      console.log(this.categories);
    }, (err) => {
      console.log(err.message);
    });

  }

}
