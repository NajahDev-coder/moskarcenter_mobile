import { Component, ViewChild } from '@angular/core';
import {NavController, Slides, ToastController} from 'ionic-angular';
import { DbworkProvider } from '../../providers/dbwork/dbwork';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import {CategoriesPage} from "../categories/categories";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";
  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
              public db:DbworkProvider, private WP: WoocommerceProvider,) {
   this.getSlideProducts();
  }

  maBoutique() {

  }

  mesAchats() {

  }

  getCategories() {
    this.navCtrl.setRoot(CategoriesPage);
  }

  notifications () {
    console.log('notification');
  }

  basket () {
    console.log('basket');
  }

  getSlideProducts() {
    this.page = 2;

    this.WooCommerce = this.WP.init();

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body);
      console.log(this.products);
    }, (err) => {
      console.log(err.message);
    });
  }


  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body));
      console.log(this.moreProducts);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();

      }
    }, (err) => {
      console.log(err)
    })
  }


  openProductPage(product){
    // this.navCtrl.push('ProductDetails', {"product": product} );
    console.log(product.title);
  }

  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }
}
