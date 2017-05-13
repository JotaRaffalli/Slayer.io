import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-inscripcion',
  templateUrl: 'inscripcion.html',
})
export class Inscripcion {

  hola: FirebaseListObservable<any>;
  private sala: any;
  private sala_nombre: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {

    this.sala = navParams.get('sala');
    console.log(this.sala);
    //this.sala_nombre = this.sala.nombre;


  }

  

}
