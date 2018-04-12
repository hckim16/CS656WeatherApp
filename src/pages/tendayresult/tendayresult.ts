import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { TenweatherProvider } from '../../providers/tenweather/tenweather';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-tendayresult',
  templateUrl: 'tendayresult.html',
})
export class TendayresultPage {
  weather:any;
  ten:any;
  location:{
    city:string,
    state:string
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider: WeatherProvider,
    private tenweatherProvider: TenweatherProvider,
    private storage: Storage) {

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

      this.tenweatherProvider.getTen(this.location.city, this.location.state).subscribe(ten => {
        //console.log(ten);
        this.ten = ten.forecast.txt_forecast.forecastday;
      });
    });
  }
}