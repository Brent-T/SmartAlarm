import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { Alarm } from './../models/alarm';

@Injectable()
export class AlarmService {
  private API_URL:string = 'http://localhost:5050';
  // private API_URL:string = 'http://1856750c.ngrok.io';

  constructor(public http: Http) { }

  public getAllAlarms(user_id:number) {
    if (user_id === null) {
      return Observable.throw('Please insert user_id');
    }
    else {
      return Observable.create(observer => {
        this.http.get(this.API_URL + '/alarms?user=' + user_id)
          .subscribe(
            res => {
              let alarm_list = res.json().map(a => new Alarm(a['id'], a['name'], a['arrival'], a['start_location'], a['end_location'], a['transportation'], a['prep_time'], a['description'], a['status'], a['user_id'], a['wake_up']));
              observer.next(alarm_list);
              observer.complete();
            },
            error => {
              observer.next(null);
              observer.complete();
            }
          );
      });
    }
  }

  public addAlarm(alarm:Alarm) {
    if(alarm.name === null || alarm.arrival === null || alarm.start_location === null || alarm.end_location === null || alarm.transportation === null || alarm.prep_time === null || alarm.description === null || alarm.status === null || alarm.user_id === null) {
      return Observable.throw('Please insert valid alarm attributes');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/addAlarm', alarm)
          .subscribe(
            res => {
              observer.next(true);
              observer.complete();
            },
            error => {
              observer.next(false);
              observer.complete();
            }
          );
      });
    }
  }

  public editAlarm(alarm:Alarm) {
    if(alarm.id === null || alarm.name === null || alarm.arrival === null || alarm.start_location === null || alarm.end_location === null || alarm.prep_time === null || alarm.description === null || alarm.status === null || alarm.user_id === null) {
      return Observable.throw('Please insert valid alarm attributes');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/editAlarm', alarm)
          .subscribe(
            res => {
              observer.next(true);
              observer.complete();
            },
            error => {
              observer.next(false);
              observer.complete();
            }
          );
      });
    }
  }

  public deleteAlarm(alarm_id:number) {
    if (alarm_id === null) {
      return Observable.throw('Please insert alarm_id');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/deleteAlarm', { 'alarm' : alarm_id })
          .subscribe(
            res => {
              observer.next(true);
              observer.complete();
            },
            error => {
              observer.next(false);
              observer.complete();
            }
          );
      });
    }
  }

  public toggleAlarm(alarm_id:number, status:boolean) {
    if (alarm_id === null || status === null) {
      return Observable.throw('Please insert valid toggle attributes');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/toggleAlarm', { 'alarm' : alarm_id, 'status' : status })
          .subscribe(
            res => {
              observer.next(true);
              observer.complete();
            },
            error => {
              observer.next(false);
              observer.complete();
            }
          );
      });
    }
  }
}
