import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HourlyProvider {
  apiKey ='1cbdebe97d411844';
  url;  

  constructor(public http: Http) {
    console.log("HourlyProvider Loaded");
    this.url = 'https://api.wunderground.com/api/' + this.apiKey + '/hourly/q';
  }
  getHourlyWeather(city, state){
    return this.http.get(this.url + '/' + state + '/' + city +'.json')
      .map(res => res.json());
  }

}
