import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { LemonWayPaymentPage } from '../lemonwaypayment/lemonwaypayments';



@Component({
    selector: 'page-payment-mode',
    templateUrl: 'paymentmode.html'
  })

export class PaymentModePage {
    constructor(public navCtrl: NavController , public db : DbworkProvider) {
        
    }

    openLemonWay() {
        this.navCtrl.setRoot(LemonWayPaymentPage);
    }

}