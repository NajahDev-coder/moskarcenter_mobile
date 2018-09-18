import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
import { ValidatePro } from '../validate_pro/validatepro';

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
      console.log(this.register.typeCompte);
      this.db.register(this.register.user_email, this.register.user_login, this.register.user_pass)
        .subscribe(
          data => {
              this.db.login(this.register.user_login, this.register.user_pass)
              .subscribe(
                data =>  {
                  localStorage.setItem('token', data);
                  if (this.register.typeCompte == "proffesionel") {
                    this.navCtrl.setRoot(ValidatePro);
                  } else {
                    this.navCtrl.setRoot(HomePage);
                  }
                },
                err => {
                  let toast = this.toastCtrl.create({
                    message : "Erreur Lors de l'enregistrement",
                    duration: 3000,
                    position: 'bottom'});
                    toast.present();
                }
              );
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
        );
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
