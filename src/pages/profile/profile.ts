import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
import { PaymentPro } from '../payment/payment';



@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
  })

export class ProfilePage {
    isReadonly = true;

    profile: {
        user_email?: string,
        user_login?: string,
        first_name?: string,
        last_name?: string,
        magasin?: string,
        adresse1?: string,
        adresse2?: string,
        pays?: string,
        postcode?: string,
        ville?: string,
        etat?: string,
        phone?: string,
        siret?: string,
    } = {};

    constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {
        this.loadProfileData();
    }

    loadProfileData() {
        console.log('load profile data here')
    }

    onSave(form) {
        console.log('You are on save here');
        this.navCtrl.setRoot(PaymentPro);
    }

}