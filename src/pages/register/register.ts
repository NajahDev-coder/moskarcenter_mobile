import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  resposeData : any;
  userData = {"user_login":"", "user_pass":"","user_email":"","ct":""};

  constructor(public navCtrl: NavController , public db : DbworkProvider, private toastCtrl:ToastController) {

  }

  signup() {
    if(this.userData.user_login && this.userData.user_pass && this.userData.user_email && this.userData.ct){
      //Api connections
    this.db.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
      console.log(this.resposeData.userData);
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.push(HomePage);
      console.log("success");
    }
    else{
      this.presentToast("Please give valid username and password");
    }
    
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log(this.userData.user_login+this.userData.user_pass+this.userData.user_email+this.userData.ct);
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
