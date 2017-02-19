import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { AlarmService } from './../../providers/alarm-service';

import { Alarm } from './../../models/alarm';

declare var google;

@Component({
  selector: 'page-edit-alarm',
  templateUrl: 'edit-alarm.html'
})
export class EditAlarmPage {
  private editSuccess;
  public transport_options:Array<string>;
  public alarm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alarm_service: AlarmService, private alertCtrl: AlertController) {
    this.editSuccess = false;
    this.transport_options = ['Driving', 'Walking', 'Bicycling', 'Transit'];
    let alarm = navParams.get('alarm');

    // Small detour for date and time input values
    let arrival = new Date(alarm.arrival);
    let time = (arrival.getHours() <= 9 ? '0' + arrival.getHours() : arrival.getHours()) + ':' + (arrival.getMinutes() <= 9 ? '0' + arrival.getMinutes() : arrival.getMinutes());
    let date = (arrival.getUTCFullYear()) + '-' + (arrival.getUTCMonth() + 1 <= 9 ? '0' + (arrival.getUTCMonth() + 1) : arrival.getUTCMonth() + 1) + '-' + (arrival.getUTCDate() <= 9 ? '0' + arrival.getUTCDate() : arrival.getUTCDate());
    this.alarm = { id: alarm.id, name: alarm.name, date: date, time: time, start_location: alarm.start_location, end_location: alarm.end_location, transportation: alarm.transportation, prep_time: alarm.prep_time, description: alarm.description, status : alarm.status, user_id: alarm.user_id };
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

  public editAlarm() {
    let alarm = new Alarm(this.alarm.id, this.alarm.name, this.alarm.date + ' ' + this.alarm.time, this.alarm.start_location, this.alarm.end_location, this.alarm.transportation, this.alarm.prep_time, this.alarm.description, this.alarm.status, this.alarm.user_id, null);
    this.alarm_service.editAlarm(alarm)
      .subscribe(
        success => {
          if(success) {
            this.editSuccess = true;
            this.showPopup('Success', 'Alarm updated.');
          }
          else {
            this.showPopup('Error', 'Problem updating alarm.');
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
           if (this.editSuccess) {
             this.navCtrl.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
