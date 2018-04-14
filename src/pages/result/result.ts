import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { TendayresultPage } from '../tendayresult/tendayresult';
import { LookuphourlyPage } from '../lookuphourly/lookuphourly';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})

export class ResultPage {
  weather:any;
  location:{
    city:string,
    state:string
  }
  
  tendayresultPage = TendayresultPage;
  lookuphourlyPage = LookuphourlyPage;

  constructor(
    public navCtrl: NavController, 
    private weatherProvider: WeatherProvider,
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
        this.weather = weather.current_observation;
      });
    });
  }
}