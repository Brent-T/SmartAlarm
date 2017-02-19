import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AuthService } from './../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private createSuccess;
  public registerCredentials;

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController) {
    this.createSuccess = false;
    this.registerCredentials = { firstname: '', surname: '', email: '', password: '' };
  }

  public register() {
    this.auth.register(this.registerCredentials)
      .subscribe(
        success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup('Success', 'Account created.');
          }
          else {
            this.showPopup('Error', 'Email is already in use.');
          }
        },
        error => {
          this.showPopup('Error', error);
        });
  }

  private showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.navCtrl.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
