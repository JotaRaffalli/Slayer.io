import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Inscripcion } from '../inscripcion/inscripcion';

@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
})
export class Grupos {

  private group: FirebaseListObservable<any>;
  private temp: FirebaseListObservable<any>;
  private uni: FirebaseListObservable<any>;
  private grupo: any;
  private sala: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
                  public alertController: AlertController, 
                      public database: AngularFireDatabase) {

      this.grupo = navParams.get('uni');
      this.group = this.database.list('/Temporada/Temporada1/'+this.grupo.$key);
      this.temp = this.database.list('/Temporada');
      this.uni = this.database.list('/Temporada/Temporada1', {
        query: {
          orderByKey: true,
          equalTo: this.grupo.$key,
        }
      });
  }

  goToInscripcion(sala) {

    var myJSON = JSON.stringify(sala);
    console.log("El stringify: "+myJSON);
    this.navCtrl.push(Inscripcion, {json: sala});
  }

}