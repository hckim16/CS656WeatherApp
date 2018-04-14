import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { HourlyProvider } from '../../providers/hourly/hourly';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-lookuphourly',
  templateUrl: 'lookuphourly.html',
})

export class LookuphourlyPage {
  location:{
    city:string,
    state:string
  }
  weather: any;
  hourly: any;
  condition: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private weatherProvider: WeatherProvider,
    private hourlyProvider: HourlyProvider,
    private storage:Storage) {
  }

  ionViewWillEnter(){
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      }
      else{
        this.location = {
          city: 'Newark',
          state: 'NJ'
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(weather => {
        console.log(weather);
        this.weather = weather.current_observation;
      });

      this.hourlyProvider.getHourlyWeather(this.location.city, this.location.state).subscribe(hourly => {
        //console.log(hourly);
        this.hourly = hourly.hourly_forecast;
        for (var i = 0; i < hourly.length; i++){
          console.log(hourly[i].condition);
        }
      });
    });
  }

}