import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { GeotendayPage } from '../geotenday/geotenday';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  weather: any;
  lat: number;
  long: number;

  geotendayPage = GeotendayPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation,
    private weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter(){
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

      this.weatherProvider.getGeoLocation(this.lat, this.long).subscribe(weather => {
        this.weather = weather.current_observation;
      });
      console.log(this.weather);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

}
