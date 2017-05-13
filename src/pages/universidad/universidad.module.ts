import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Universidad } from './universidad';

@NgModule({
  declarations: [
    Universidad,
  ],
  imports: [
    IonicPageModule.forChild(Universidad),
  ],
  exports: [
    Universidad
  ]
})
export class UniversidadModule {}
