import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { DbworkProvider } from '../../providers/dbwork/dbwork';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  resposeData: any;

  userData = {"user_login":"", "user_pass":""};

  constructor(public navCtrl: NavController , public db : DbworkProvider , private toastCtrl:ToastController) {

  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }

  login(){
    if(this.userData.user_login && this.userData.user_pass){
     this.db.postData(this.userData, "login").then((result) =>{
     this.resposeData = result;
     console.log(this.resposeData);
     if(this.resposeData.userData){
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
     this.navCtrl.push(HomePage);
   }
   else{
     this.presentToast("Please give valid username and password");
   }
     
 
 
     }, (err) => {
       //Connection failed message
     });
    }
    else{
     this.presentToast("Give username and password");
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
