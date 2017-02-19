import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

import { AuthService } from './../../providers/auth-service';
import { AlarmService } from './../../providers/alarm-service';

import { Alarm } from './../../models/alarm';

import { AlarmDetailPage } from './../alarm-detail/alarm-detail';
import { AddAlarmPage } from './../add-alarm/add-alarm';

@Component({
  selector: 'page-alarm-list',
  templateUrl: 'alarm-list.html'
})
export class AlarmListPage {
  loading: Loading;
  alarms: Array<Alarm>;

  constructor(public navCtrl: NavController, private auth: AuthService, private alarm_service: AlarmService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    this.showLoading();
    let user_id = this.auth.getUserInfo().id;
    this.alarm_service.getAllAlarms(user_id)
      .subscribe(
        res => {
          if(res != null) {
            setTimeout(() => {
              this.loading.dismiss();
              this.alarms = res;
              this.setAlarms();
            });
          }
          else {
            this.showPopup('Fail', 'Alarms could not be found');
          }
        },
        error => {
          this.showPopup('Error', error);
        });
  }

  public setAlarms() {
    this.alarms.forEach((alarm) => {
      LocalNotifications.cancel(alarm.id);
      if(alarm.status) {
        LocalNotifications.schedule({
          id: alarm.id,
          title: 'SmartAlarm: ' + alarm.name,
          text: alarm.description,
          at: new Date(alarm.wake_up),
          sound: null
        });
      }
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

  public alarmDetail(event, alarm) {
    this.navCtrl.push(AlarmDetailPage, {
      alarm: alarm
    });
  }

  public addAlarm(event) {
    this.navCtrl.push(AddAlarmPage);
  }
}
