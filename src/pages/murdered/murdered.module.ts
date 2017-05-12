import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Murdered } from './murdered';

@NgModule({
  declarations: [
    Murdered,
  ],
  imports: [
    IonicPageModule.forChild(Murdered),
  ],
  exports: [
    Murdered
  ]
})
export class MurderedModule {}
