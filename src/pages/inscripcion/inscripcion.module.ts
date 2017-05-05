import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Inscripcion } from './inscripcion';

@NgModule({
  declarations: [
    Inscripcion,
  ],
  imports: [
    IonicPageModule.forChild(Inscripcion),
  ],
  exports: [
    Inscripcion
  ]
})
export class InscripcionModule {}
