import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { AuthService } from './../../providers/auth-service';
import { AlarmService } from './../../providers/alarm-service';

import { Alarm } from './../../models/alarm';

declare var google;

@Component({
  selector: 'page-add-alarm',
  templateUrl: 'add-alarm.html'
})
export class AddAlarmPage {
  private createSuccess;
  public transport_options:Array<string>;
  public alarm;

  constructor(public navCtrl: NavController, private auth: AuthService, private alarm_service: AlarmService, private alertCtrl: AlertController) {
    this.createSuccess = false;
    this.transport_options = ['Driving', 'Walking', 'Bicycling', 'Transit'];
    this.alarm = { name: '', date: '', time: '', start_location: '', end_location: '', transportation: '', prep_time: '', description: '', status : true, user_id: 0 };
  }

  ngOnInit() {
    /* Setup for google places suggestions SRC:https://ionicallyspeaking.com/2016/06/07/google-places-autocomplete-and-ionic-2/ */

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById('location_from').childNodes[0]);
    let input_to = (<HTMLInputElement>document.getElementById('location_to').childNodes[0]);

    // create the two autocompletes on the from and to fields
    let autocomplete_from = new google.maps.places.Autocomplete(input_from);
    let autocomplete_to = new google.maps.places.Autocomplete(input_to);

    // add event listeners to bind alarm location to selected suggestion
    google.maps.event.addListener(autocomplete_from, 'place_changed', () => {
      this.alarm.start_location = autocomplete_from.getPlace().formatted_address;
    });

    google.maps.event.addListener(autocomplete_to, 'place_changed', () => {
      this.alarm.end_location = autocomplete_to.getPlace().formatted_address;
    });
  }

  public setStartToCurrentLocation() {
    Geolocation.getCurrentPosition().then((position) => {
      var geocoder = new google.maps.Geocoder();
      let request = {
        latLng: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      };
      geocoder.geocode(request, (data, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (data[0] != null) {
            this.alarm.start_location = data[0].formatted_address;
          }
          else {
            this.showPopup('Error', 'Your location could not be found.');
          }
        }
      });
    });
  }

  public addAlarm() {
    let current_user_id = this.auth.getUserInfo().id;
    let alarm = new Alarm(null, this.alarm.name, this.alarm.date + ' ' + this.alarm.time, this.alarm.start_location, this.alarm.end_location, this.alarm.transportation, this.alarm.prep_time, this.alarm.description, this.alarm.status, current_user_id, null);
    this.alarm_service.addAlarm(alarm)
      .subscribe(
        success => {
          if(success) {
            this.createSuccess = true;
            this.showPopup('Success', 'Alarm created.');
          }
          else {
            this.showPopup('Error', 'Problem creating alarm.');
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
             this.navCtrl.pop();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
