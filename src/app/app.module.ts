import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LookupPage } from '../pages/lookup/lookup';
import { ResultPage } from '../pages/result/result';
import { TendayPage } from '../pages/tenday/tenday';
import { TendayresultPage } from '../pages/tendayresult/tendayresult';
import { GeotendayPage } from '../pages/geotenday/geotenday';
import { HourlyPage} from  '../pages/hourly/hourly';
import { LookuphourlyPage} from  '../pages/lookuphourly/lookuphourly';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TenweatherProvider } from '../providers/tenweather/tenweather';
import { WeatherProvider } from '../providers/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';
import { HourlyProvider } from '../providers/hourly/hourly';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    HourlyPage,
    LookuphourlyPage,
    LookupPage,
    ResultPage,
    TabsPage,
    TendayPage,
    TendayresultPage,
    GeotendayPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    HourlyPage,
    LookuphourlyPage,
    LookupPage,
    ResultPage,
    TabsPage,
    TendayPage,
    TendayresultPage,
    GeotendayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    TenweatherProvider,
    HourlyProvider
  ]
})
export class AppModule {}