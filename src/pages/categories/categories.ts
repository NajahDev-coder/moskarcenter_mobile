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
  categories = [];
  searchQuery: string = "";

  constructor(public navCtrl: NavController, public storage: Storage,
              private db: DbworkProvider, private toastCtrl:ToastController,
              public events: Events, private WP: WoocommerceProvider) {
    this.getCategories();
  }

  getCategories() {

    this.WooCommerce = this.WP.init();


    this.WooCommerce.getAsync("products/categories?per_page=64").then( (data) => {
      let temp: any[] = JSON.parse(data.body);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].name != 'Uncategorized') {
          if (temp[i].parent == 0) {
            temp[i].subCategories = [];
            this.categories.push(temp[i]);
          }
        } 
      }
      for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < this.categories.length; j++){
          if(this.categories[j].id == temp[i].parent){
            this.categories[j].subCategories.subSubCategories = [];
            this.categories[j].subCategories.push(temp[i]);
          }
        }
      }
    }, (err) => {
      console.log(err.message);
    });

  }

  openSubCategory(category) {
    return true;
  }

  openCategoryPage(category) {
    console.log(category);
  }

}
