import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { User } from './../models/user';

@Injectable()
export class AuthService {
  private API_URL:string = 'http://localhost:5050';
  // private API_URL:string = 'http://1856750c.ngrok.io';
  currentUser: User;

  constructor(private http:Http) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/login', credentials)
          .subscribe(
            res => {
              let json_user = res.json();
              this.currentUser = new User(json_user['id'], json_user['firstname'], json_user['surname'], json_user['email']);
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

  public register(credentials) {
    if (credentials.firstname === null || credentials.surname === null || credentials.email === null || credentials.password === null) {
      return Observable.throw('Please fill in all fields');
    }
    else {
      return Observable.create(observer => {
        this.http.post(this.API_URL + '/register', credentials)
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

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
