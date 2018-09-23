// import { Component } from '@angular/core';
// import { NavController, ToastController, Events } from 'ionic-angular';
// import { DbworkProvider } from "../../../providers/dbwork/dbwork";
// import { Storage } from '@ionic/storage';
// import {WoocommerceProvider} from "../../../providers/woocommerce/woocommerce";
//
// @Component({
//   selector: 'page-payments',
//   templateUrl: 'payments.html'
// })
// export class PaymentsPage {
//   WooCommerce: any;
//   payments: any[];
//
//   constructor(public navCtrl: NavController, public storage: Storage,
//               private db: DbworkProvider, private toastCtrl:ToastController,
//               public events: Events, private WP: WoocommerceProvider) {
//     this.getPayments();
//   }
//
//   getPayments() {
//     this.WooCommerce = this.WP.init();
//     this.WooCommerce.getAsync("orders").then( (data) => {
//       this.payments = JSON.parse(data.body);
//       console.log(this.payments);
//     }, (err) => {
//       console.log(err.message);
//     });
//   }
//
// }
