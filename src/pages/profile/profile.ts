import { Component } from '@angular/core';
import { NavController , ToastController, NavParams } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import {WoocommerceProvider} from "../../providers/woocommerce/woocommerce";
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
  })

export class ProfilePage {
    isReadonly = true;
    countries : any;
    WooCommerce: any;
    isPro: boolean = true;
    Profil: string;
    validpro: boolean;

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

    constructor(public navCtrl: NavController , public navParams: NavParams, public storage: Storage, public WP: WoocommerceProvider, public db : DbworkProvider, private toastCtrl:ToastController) {
        this.WooCommerce = this.WP.init();
        if (this.navParams.get('validpro') == true) {
            this.Profil = 'ValidatePro';
            this.validpro = true;
        } else {
            this.validpro = false;
            this.Profil = 'Profil';
        }
        this.loadCountries();
        this.loadProfileData();
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

    loadProfileData() {
        let user: any;
        this.storage.ready().then(() => {
            this.storage.get("userLoginInfo").then((userLoginInfo) => {
              if (userLoginInfo != null) {
                this.WooCommerce.getAsync("customers/"+ userLoginInfo.user.id).then( (data) => {
                    user = JSON.parse(data.body);
                    for (let obj of user.meta_data) {
                        if (obj.key === 'type_compte') {
                            localStorage.setItem('type_compte', obj.value);
                            if (obj.value === 'Compte Proffessionel') {
                                this.isPro = true;
                            } else {
                                this.isPro = false;
                            }
                        }
                        if (obj.key == 'siret') {
                            this.profile.siret= obj.value;
                        }
                    }
                    this.profile.email = user.email;
                    this.profile.username = user.username;
                    this.profile.first_name = user.first_name;
                    this.profile.last_name = user.last_name;
                    this.profile.magasin = user.billing.company;
                    this.profile.adresse1= user.billing.address_1;
                    this.profile.adresse2= user.billing.address_2;
                    this.profile.pays= user.billing.country;
                    this.profile.postcode= user.billing.postcode;
                    this.profile.ville= user.billing.city;
                    this.profile.etat= user.billing.state;
                    this.profile.phone= user.billing.phone;
                });
              }
            });
        });
    }

    onValidate() {
        this.Profil = 'Profil';
    }

    onCheckout() {
        this.Profil = 'Bienvenue';
    }

    onSave(form) {
        if (form.valid) {
            console.log('put here: '+ this.profile);
            this.storage.ready().then(() => {
                this.storage.get("userLoginInfo").then((userLoginInfo) => {
                  if (userLoginInfo != null) {
                    var data = {
                        email: this.profile.email,
                        username: this.profile.username,
                        first_name: this.profile.first_name,
                        last_name: this.profile.last_name,
                        role: 'seller',
                        billing: {
                            company: this.profile.magasin,
                            address_1: this.profile.adresse1,
                            address_2: this.profile.adresse2,
                            country: this.profile.pays,
                            post_code: this.profile.postcode,
                            city: this.profile.ville,
                            state: this.profile.etat,
                            phone: this.profile.phone,
                        },
                        meta_data: [
                            {
                                key: "type_compte",
                                value: localStorage.getItem('type_compte')
                            },
                            {
                              key: "siret",
                              value: this.profile.siret
                            }
                        ]
                    }
                    this.WooCommerce.put("customers/"+ userLoginInfo.user.id, data, function(err, data, res) {
                        console.log(res);
                    });
                    if (this.validpro) {
                        this.Profil = 'Checkout';
                    } else {
                        this.Profil = 'Bienvenue'
                    }
                  }
                });
            });
        }
    }

}