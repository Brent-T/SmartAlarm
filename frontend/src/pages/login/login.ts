import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from './../../providers/auth-service';

import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loading: Loading;
  public loginCredentials;

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.loginCredentials = { email: '', password: '' };
  }

  public login() {
    this.showLoading();
    this.auth.login(this.loginCredentials)
      .subscribe(
        allowed => {
          if (allowed) {
            setTimeout(() => {
              this.loading.dismiss();
              this.navCtrl.setRoot(HomePage);
            });
          }
          else {
            this.showPopup('Fail', 'Invalid login');
          }
        },
        error => {
          this.showPopup('Fail', error);
        });
  }

  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  private showPopup(title, text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  public register() {
    this.navCtrl.push(RegisterPage);
  }
}
