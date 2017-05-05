import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Inscripcion } from '../inscripcion/inscripcion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  group: FirebaseListObservable<any>;
  temp: FirebaseListObservable<any>;
  uni: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
                  public alertController: AlertController, 
                      public database: AngularFireDatabase) {

      this.group = this.database.list('/Temporada/Temporada1/Unimet');
      this.temp = this.database.list('/Temporada');
      this.uni = this.database.list('/Temporada/Temporada1', {
        query: {
          orderByKey: true,
          equalTo: 'Unimet'
        }
      });
  }

  gotoGroup(g) {
    this.navCtrl.push(Inscripcion, {group: this.group});
  }

}
