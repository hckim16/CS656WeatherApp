import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { GeotendayPage } from '../geotenday/geotenday';
import { HourlyPage } from '../hourly/hourly';
import { MapPage } from '../map/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  weather: any;
  lat: number;
  long: number;
  city: any;
  state: any;
  radar: any;
  aniradsat: any;
  

  geotendayPage = GeotendayPage;
  hourlyPage = HourlyPage;
  mapPage = MapPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public httpClientModule: HttpClientModule,
    private geo: Geolocation,
    private weatherProvider: WeatherProvider) {

  }

  

  ionViewWillEnter(){
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

      this.weatherProvider.getGeoLocation(this.lat, this.long).subscribe(weather => {
        this.weather = weather.current_observation;
        this.city = weather.current_observation.display_location.city;
        this.state = weather.current_observation.display_location.state;

        this.radar = "https://api.wunderground.com/api/1cbdebe97d411844/radar/q/" + this.state + "/" + this.city + ".gif?width=280&height=280&newmaps=1";

        this.aniradsat = "https://api.wunderground.com/api/1cbdebe97d411844/animatedradar/animatedsatellite/q/" + this.state + "/" + this.city + ".gif?num=6&delay=50&interval=30"
      });
    }).catch((error) => {
       console.log('Error getting location', error);
      });

  }

}
