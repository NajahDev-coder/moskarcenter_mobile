import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { PaymentModePage } from '../paymentmode/paymentmode';



@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html'
  })

export class PaymentPro {
    countries: any;

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
        this.loadCountries();
        this.loadBillingData();
    }

    is_mayotte(pays){
        if (pays == 'Mayotte'){
            return true;
        } else {
            return false;
        }
    }

    loadCountries() {
        this.db.getCountries()
        .subscribe(
            data => {
                this.countries = data;
            },
            err => console.log(err),
            () => console.log('countries are here')
        );
    }


    loadBillingData() {
        this.db.getBillingData();
        /*.subscribe(
            data => {
                this.facture = data;
            },
            err => console.log(err),
            () => console.log('loading billing data')
        );*/
    }

    onSave(form) {
        if (form.valid) {
            let toast = this.toastCtrl.create({
                message : 'Données Sauvegardées Correctement',
                duration: 3000,
                position: 'bottom'
              });
            toast.present();
            ///window.open("https://sandbox-webkit.lemonway.fr/lwecommerce/dev/?moneyintoken=180526106nrukbu7UCxQgHMbb0FZgFTgho",'_system', 'location=yes');
            this.navCtrl.setRoot(PaymentModePage);
        }
    }

}