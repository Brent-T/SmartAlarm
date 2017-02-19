import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AlarmListPage } from '../pages/alarm-list/alarm-list';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  // rootPage: any = AlarmListPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public menu: MenuController) {
    this.initializeApp();

    // Init menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My alarms', component: AlarmListPage },
      { title: 'Profile', component: ProfilePage }
    ];
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  public openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
