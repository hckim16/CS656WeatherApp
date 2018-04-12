import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TendayPage } from './tenday';

@NgModule({
  declarations: [
    TendayPage,
  ],
  imports: [
    IonicPageModule.forChild(TendayPage),
  ],
})
export class TendayPageModule {}
