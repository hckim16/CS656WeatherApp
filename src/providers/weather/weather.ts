import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apiKey ='1cbdebe97d411844';
  url; 
  url1
  url3; 

  constructor(public http: Http) {
    this.url = 'https://api.wunderground.com/api/' + this.apiKey + '/conditions/q';
    this.url1 = 'https://api.wunderground.com/api/' + this.apiKey + '/hourly/q';
    this.url3 = 'https://api.wunderground.com/api/' + this.apiKey + '/radar/q';
  }

  getWeather(city, state){
    return this.http.get(this.url + '/' + state + '/' + city +'.json')
      .map(res => res.json());
  }

  getRadar(city, state){
    return this.http.get(this.url3 + '/' + state + '/' + city +'.gif?width=280&height=280&newmaps=1');
  }

  getGeoLocation(latitude, longitude){
    return this.http.get(this.url + '/' + latitude + ',' + longitude +'.json')
      .map(res => res.json());
  }

}
