import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { TendayresultPage } from '../tendayresult/tendayresult';
import { LookuphourlyPage } from '../lookuphourly/lookuphourly';
import { Map1Page } from '../map1/map1';

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
  radar: any;
  aniradsat: any;
  
  tendayresultPage = TendayresultPage;
  lookuphourlyPage = LookuphourlyPage;
  map1Page = Map1Page;

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

      this.radar = "https://api.wunderground.com/api/1cbdebe97d411844/radar/q/" + this.location.state + "/" + this.location.city + ".gif?width=280&height=280&newmaps=1";

      this.aniradsat = "https://api.wunderground.com/api/1cbdebe97d411844/animatedradar/animatedsatellite/q/" + this.location.state + "/" + this.location.city + ".gif?num=6&delay=50&interval=30"
    });
  }
}