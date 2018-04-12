import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class TenweatherProvider {
  apiKey ='1cbdebe97d411844';
  url; 

  constructor(public http: Http) {
    console.log('Hello RainProvider Provider');
    this.url = 'https://api.wunderground.com/api/' + this.apiKey + '/forecast10day/q';
  }

  getTen(city, state){
    return this.http.get(this.url + '/' + state + '/' + city +'.json')
      .map(res => res.json());
  }

  getGeoTen(city, state){
    return this.http.get(this.url + '/' + state + '/' + city +'.json')
      .map(res => res.json());
  }
}
