import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from './../../providers/auth-service';

import { LoginPage } from '../login/login';

import { User } from './../../models/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  currentUser:User;

  constructor(public navCtrl: NavController, private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getUserInfo();
  }

  public logout() {
    this.auth.logout()
      .subscribe(success => {
        this.navCtrl.setRoot(LoginPage);
      });
  }
}
