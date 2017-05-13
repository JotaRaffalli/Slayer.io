import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Grupos } from '../grupos/grupos';


@Component({
  selector: 'page-universidad',
  templateUrl: 'universidad.html',
})
export class Universidad {

  uni: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
                  public alertController: AlertController, 
                      public database: AngularFireDatabase) {

      this.uni = this.database.list('/Temporada/Temporada1');
  }

  gotoGroup(u) {
    this.navCtrl.push(Grupos, {uni: u});
  }

 

}
