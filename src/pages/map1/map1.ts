import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-map1',
  templateUrl: 'map1.html',
})
export class Map1Page {

  @ViewChild('map1') map1Element;
  map1: any;
  marker: any;
  lat: number;
  long: number;
  weather:any;
  location:{
    city:string,
    state:string
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {

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
        this.lat = weather.current_observation.display_location.latitude;
        console.log(this.lat);
        this.long = weather.current_observation.display_location.longitude;
      
        this.initMap();
      });
    });
  }

  initMap(){

    let latlng = new google.maps.LatLng(this.lat, this.long);
    
    let map1Options = {
      center: latlng,
      zoom: 5,
      map1TypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.map1 = new google.maps.Map(this.map1Element.nativeElement, map1Options);

    this.marker = new google.maps.Marker({
      position: latlng,
      map: this.map1
    })
  }

}
