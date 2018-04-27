import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-map1',
  templateUrl: 'map1.html',
})
export class Map1Page {

  map1Element: any;
  map1: any;
  marker: any;
  lat: number;
  long: number;
  weather:any;
  location:{
    city:string,
    state:string
  }
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  center: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {
      this.geocoder = new google.maps.Geocoder;
      let elem = document.createElement("div")
      this.GooglePlaces = new google.maps.places.PlacesService(elem);
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = {
        input: ''
      };
      this.autocompleteItems = [];
      this.markers = [];
      this.loading = this.loadingCtrl.create();
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
        this.lat = weather.current_observation.display_location.latitude;
        this.long = weather.current_observation.display_location.longitude;

        let pos = new google.maps.LatLng(this.lat, this.long);
      
        this.map1 = new google.maps.Map(document.getElementById('map1'), {
          center: pos,
          zoom: 12
        });

        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map1
        })
      });
    });
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map1
        });
        this.markers.push(marker);
        this.map1.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  

}
