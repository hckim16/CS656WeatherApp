import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HourlyPage } from './hourly';

@NgModule({
  declarations: [
    HourlyPage,
  ],
  imports: [
    IonicPageModule.forChild(HourlyPage),
  ],
})
export class HourlyPageModule {}
