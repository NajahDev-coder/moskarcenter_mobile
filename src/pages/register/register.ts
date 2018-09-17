import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  resposeData : any;
  register: {
    "user_login"?: string,
    "user_pass"?: string,
    "user_email"?: string,
    "typeCompte"?: string
    } = {};

  constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {

  }

  onRegister(form) {
    if (form.valid) {
      this.db.register(this.register);
        /*.subscribe(
          data => {
            localStorage.setItem('token', data);
            let toast = this.toastCtrl.create({
              message : 'Bienvenue! Vous êtes entregisté avec succèes!',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();

          },
          err => {
            let toast = this.toastCtrl.create({
              message : "Erreur Lors de l'enregistrement",
              duration: 3000,
              position: 'bottom'
          });
          toast.present();

          },
          () => {}
        );*/
    } 
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
