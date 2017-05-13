import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Grupos } from './grupos';

@NgModule({
  declarations: [
    Grupos,
  ],
  imports: [
    IonicPageModule.forChild(Grupos),
  ],
  exports: [
    Grupos
  ]
})
export class GruposModule {}
