import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { AlarmService } from '../providers/alarm-service';

import { TimeFilter } from '../pipes/time-filter';
import { DateFilter } from '../pipes/date-filter';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { AlarmListPage } from '../pages/alarm-list/alarm-list';
import { AlarmDetailPage } from '../pages/alarm-detail/alarm-detail';
import { EditAlarmPage } from '../pages/edit-alarm/edit-alarm';
import { AddAlarmPage } from '../pages/add-alarm/add-alarm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AlarmListPage,
    AlarmDetailPage,
    EditAlarmPage,
    AddAlarmPage,
    TimeFilter,
    DateFilter
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AlarmListPage,
    AlarmDetailPage,
    EditAlarmPage,
    AddAlarmPage
  ],
  providers: [
    AuthService,
    AlarmService
  ]
})
export class AppModule {}
