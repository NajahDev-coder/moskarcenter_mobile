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
        magasin?: string,
        pays?: string,
        adresse1?: string,
        ville?: string,
        etat?: string,
        postcode?: string,
        phone?: string,
        user_email?: string,
    } = {};

    constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {

    }

    onSave(form) {
        console.log('adresse facturation validé');
        this.navCtrl.setRoot(BienvenuePage);
    }

}