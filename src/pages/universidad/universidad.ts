import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Grupos } from '../grupos/grupos';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-universidad',
  templateUrl: 'universidad.html',
})
export class Universidad {

  uni: FirebaseListObservable<any>;
  data: FirebaseObjectObservable<any>;
  dataSnap: any;
  private authState: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
                  public alertController: AlertController, 
                      public database: AngularFireDatabase, private afAuth: AngularFireAuth) {

        //verificamos el estado de autenticación
        this.authState = afAuth.authState;
        //primero buscamos al usuario
        this.authState.subscribe((user: firebase.User) => {

            console.log('user is: ' + user.uid);
            //agarramos la data del usuario
            this.data = this.database.object('/Usuario/'+user.uid);
            //hacemos un snapshot de esa data
            this.data.subscribe(snapshot => {
                    //armamos el objeto
                    this.dataSnap = snapshot;
                    //buscamos la uni/unis 
                    this.uni = this.database.list('Temporada/Temporada1', {
                      query:{
                        orderByKey: true,
                        equalTo: this.dataSnap.Universidad,
                      }
                    });
                    
             });     
  });
  }

  goToGroup(u) {
    this.navCtrl.push(Grupos, {uni: u});
  }

 

}
