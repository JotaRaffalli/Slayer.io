import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  group: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
                  public alertController: AlertController, 
                      public database: AngularFireDatabase) {

      this.group = this.database.list('/Temporada/Temporada1/Unimet/Grupo1');

  }

  gotoHome() {
    this.navCtrl.push(HomePage);
  }

}
