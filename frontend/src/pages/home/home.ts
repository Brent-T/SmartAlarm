import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { AlarmListPage } from './../alarm-list/alarm-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, private auth: AuthService) { }

  public goToAlarms() {
    this.navCtrl.setRoot(AlarmListPage);
  }
}
