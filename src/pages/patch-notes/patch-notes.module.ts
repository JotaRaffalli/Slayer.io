import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatchNotes } from './patch-notes';

@NgModule({
  declarations: [
    PatchNotes,
  ],
  imports: [
    IonicPageModule.forChild(PatchNotes),
  ],
  exports: [
    PatchNotes
  ]
})
export class PatchNotesModule {}
