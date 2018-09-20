import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { ProfilePage } from '../profile/profile';



@Component({
    selector: 'page-validate',
    templateUrl: 'validate.html'
  })

export class ValidatePro {

    constructor(public navCtrl: NavController , public db : DbworkProvider) {

    }

    onValidate() {
        this.navCtrl.setRoot(ProfilePage);
    }

}