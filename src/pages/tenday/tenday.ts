import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TendayresultPage } from '../tendayresult/tendayresult';


@IonicPage()
@Component({
  selector: 'page-tenday',
  templateUrl: 'tenday.html',
})
export class TendayPage {
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
          this.city = 'Miami';
          this.state = 'FL';
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
    this.navCtrl.push(TendayresultPage);
  }

}