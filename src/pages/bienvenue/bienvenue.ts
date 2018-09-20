import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";



@Component({
    selector: 'page-bienvenue',
    templateUrl: 'bienvenue.html'
  })

export class BienvenuePage {

    constructor(public navCtrl: NavController , public db : DbworkProvider) {

    }

    dashboard () {
        console.log('dashboard here');
    }

    magasin () {
        console.log('magasin here');
    }
}