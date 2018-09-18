import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';



@Component({
    selector: 'page-validate',
    templateUrl: 'validate.html'
  })

export class ValidatePro {

    constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {

    }

    onValidate() {
        this.navCtrl.setRoot(ProfilePage);
    }

}