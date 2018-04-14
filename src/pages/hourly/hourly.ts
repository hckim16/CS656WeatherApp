import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { HourlyProvider } from '../../providers/hourly/hourly';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-hourly',
  templateUrl: 'hourly.html'
})

export class HourlyPage {
  weather: any;
  hourly: any;
  lat: number;
  long: number;
  city: string;
  state: string;
  condition: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation,
    private weatherProvider: WeatherProvider,
    private hourlyProvider: HourlyProvider,
    private storage:Storage) {
  }

  ionViewWillEnter(){
    
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

      this.weatherProvider.getGeoLocation(this.lat, this.long).subscribe(weather => {
        this.weather = weather.current_observation;
        this.city = weather.current_observation.display_location.city;
        this.state = weather.current_observation.display_location.state;

        this.hourlyProvider.getHourlyWeather(this.city, this.state).subscribe(hourly => {
          //console.log(hourly);
          this.hourly = hourly.hourly_forecast;
          for (var i = 0; i < hourly.length; i++){
            console.log(hourly[i].condition);
          }
        });

      });

    }).catch((error) => {
       console.log('Error getting location', error);
      });
   

}

}
