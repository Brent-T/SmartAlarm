import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AlarmService } from './../../providers/alarm-service';

import { Alarm } from './../../models/alarm';

import { EditAlarmPage } from './../edit-alarm/edit-alarm';

@Component({
  selector: 'page-alarm-detail',
  templateUrl: 'alarm-detail.html'
})
export class AlarmDetailPage {
  private deleteSuccess;
  public alarm: Alarm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alarm_service: AlarmService, private alertCtrl: AlertController) {
    this.deleteSuccess = false;
    this.alarm = navParams.get('alarm');
  }

  public toggleAlarm() {
    this.alarm_service.toggleAlarm(this.alarm.id, this.alarm.status)
      .subscribe(
        success => {
          if(!success) {
            this.showPopup('Error', 'Problem toggling alarm.');
          }
        },
        error => {
          this.showPopup('Error', error);
        });
  }

  public editAlarm() {
    this.navCtrl.push(EditAlarmPage, {
      alarm : this.alarm
    });
  }

  public deleteAlarm(event, alarm_id) {
    this.alarm_service.deleteAlarm(alarm_id)
      .subscribe(
        success => {
          if(success) {
            this.deleteSuccess = true;
            this.showPopup('Success', 'Alarm deleted.');
          }
          else {
            this.showPopup('Error', 'Problem deleting alarm.');
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
           if (this.deleteSuccess) {
             this.navCtrl.pop();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
