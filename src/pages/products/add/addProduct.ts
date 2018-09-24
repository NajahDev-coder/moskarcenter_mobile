import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";

@Component({
  selector: 'page-addProduct',
  templateUrl: 'addProduct.html'
})
export class AddProductPage {
  WooCommerce: any;
  all_categories: any= [];
  product:{name?: string, type?:string, regular_price?: string, description?: string,
    short_description?: string, store?: any, categories?: any} = {};
  images: any[] = [];

  constructor(public navCtrl: NavController, public storage: Storage,
              public events: Events, private WP: WoocommerceProvider) {
        this.WooCommerce = this.WP.init();
        this.getCategories();
  }
  
  getCategories() {
    this.WooCommerce.getAsync("products/categories?per_page=64").then( (data) => {
        this.all_categories = JSON.parse(data.body);
    });
  }
  
  addProduct(form) {    
    if (form.valid) {
       this.product.categories = [
           {
               id: 22,
           }
       ];
        this.product.type = "simple";
        
        
        this.WooCommerce.post('products', this.product, function(err, data, res) {
            console.log(res);
        });
    }
  }
}
