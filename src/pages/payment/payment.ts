import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { BienvenuePage } from '../bienvenue/bienvenue';



@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html'
  })

export class PaymentPro {

    facture: {
        first_name?: string,
        last_name?: string,
        company?: string,
        country?: string,
        address_1?: string,
        city?: string,
        state?: string,
        postcode?: string,
        phone?: string,
        email?: string,
    } = {};

    constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {
        this.loadBillingData();
    }

    loadBillingData() {
        this.db.getBillingData()
        .subscribe(
            data => {
                this.facture = data;
            },
            err => console.log(err),
            () => console.log('loading billing data')
        );
    }

    onSave(form) {
        if (form.valid) {
            this.navCtrl.setRoot(BienvenuePage);
        }
    }

}