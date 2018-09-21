import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";



@Component({
    selector: 'page-lemon-payment',
    templateUrl: 'lemonwaypayment.html'
  })

export class LemonWayPaymentPage {

    payment: {
        n_carte?: string,
        expire_date?: string,
        cvc?: string,
    } = {};
    
    constructor(public navCtrl: NavController , public db : DbworkProvider) {
        
    }

    savePayment(form) {
        if (form.valid) {
            console.log(this.payment);
            /*this.db.send_payment()
                .subscribe(
                    data => console.log(data),
                    err => console.log(err)
                );*/
        }
    }

}