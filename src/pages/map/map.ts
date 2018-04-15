import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement;
  map: any;
  lat: number;
  long: number;
  marker: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation) {
  }

  ionViewDidLoad() {
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

      this.initMap();
    });
  }

  initMap(){

    let latlng = new google.maps.LatLng(this.lat, this.long);
    
    let mapOptions = {
      center: latlng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: latlng,
      map: this.map
    })
  }

}
