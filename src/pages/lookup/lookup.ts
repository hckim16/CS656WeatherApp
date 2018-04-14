import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ResultPage } from '../result/result';


@IonicPage()
@Component({
  selector: 'page-lookup',
  templateUrl: 'lookup.html',
})
export class LookupPage {
  city:string;
  state:string;
  country:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {

      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
          this.state = location.state;
          this.country = location.country;
        } else {
          this.city = 'Newark';
          this.state = 'NJ';
          this.country = 'US';
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LookupPage');
  }

  saveForm(){
    let location = {
      city: this.city,
      state: this.state,
      country: this.country
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.push(ResultPage);
  }

}