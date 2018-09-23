import { Component } from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';


@Component({
  templateUrl: 'details.html'
})
export class ProductDetailsPage {
  product = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.data;
  }
}
