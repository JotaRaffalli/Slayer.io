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
  private group: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {

    this.group = navParams.get('sala');
    this.hola = this.database.list('/Temporada/Temporada1/Unimet', {
      query: {
          equalTo: this.group.$key
        }
    });

  }

  

}
