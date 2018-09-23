import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { DbworkProvider } from "../../../providers/dbwork/dbwork";
import { Storage } from '@ionic/storage';
import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";

@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html'
})
export class CommandesPage {
  WooCommerce: any;
  orders: any[];

  constructor(public navCtrl: NavController, public storage: Storage,
              private db: DbworkProvider, private toastCtrl:ToastController,
              public events: Events, private WP: WoocommerceProvider) {
    this.getCommandes();
  }

  getCommandes() {
    this.WooCommerce = this.WP.init();
    this.WooCommerce.getAsync("orders").then( (data) => {
      this.orders = JSON.parse(data.body);
      console.log(this.orders);
    }, (err) => {
      console.log(err.message);
    });
  }

}
