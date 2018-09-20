import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { PaymentPro } from '../payment/payment';



@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
  })

export class ProfilePage {
    isReadonly = true;

    profile: {
        email?: string,
        username?: string,
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
       this.db.getProfileData()
        .subscribe(
            data => {
                this.profile = data.json();
                let billingData = data.json().billing;
                this.profile.magasin = billingData.company;
                this.profile.adresse1 = billingData.address_1;
                this.profile.adresse2 = billingData.address_2;
                this.profile.pays = billingData.country;
                this.profile.postcode = billingData.postcode;
                this.profile.ville = billingData.city;
                this.profile.etat = billingData.state;
                this.profile.phone = billingData.phone;
            },
            err => console.log(err),
            () => console.log('loading profile data')
        );
    }

    onSave(form) {
        if (form.valid) {
            this.db.editProfile(this.profile)
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => {console.log('Profile save')}
            );
            this.navCtrl.setRoot(PaymentPro);
        }
    }

}