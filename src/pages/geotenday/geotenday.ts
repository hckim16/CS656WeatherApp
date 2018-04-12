import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TenweatherProvider } from '../../providers/tenweather/tenweather';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-geotenday',
  templateUrl: 'geotenday.html'
})

export class GeotendayPage {
  ten: any;
  weather: any;
  lat: number;
  long: number;
  city: string;
  state: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation,
    private weatherProvider: WeatherProvider,
    private tenweatherProvider: TenweatherProvider,
    private storage:Storage) {

      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
          this.state = location.state;
        } else {
          this.city = 'Miami';
          this.state = 'FL';
        }
      });

  }

  ionViewWillEnter(){
    
      this.geo.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
  
        this.weatherProvider.getGeoLocation(this.lat, this.long).subscribe(weather => {
          this.weather = weather.current_observation;
          this.city = weather.current_observation.display_location.city;
          this.state = weather.current_observation.display_location.state;

          this.tenweatherProvider.getGeoTen(this.city, this.state).subscribe(ten => {
            console.log(ten);
            this.ten = ten.forecast.txt_forecast.forecastday;
          });

        });

      }).catch((error) => {
         console.log('Error getting location', error);
        });
     

  }

}
