import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LeaderboardModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leaderboard-modal',
  templateUrl: 'leaderboard-modal.html',
})
export class LeaderboardModal {

  private authState: Observable<firebase.User>;
  private Usuario_Observable: FirebaseObjectObservable<any>; 
  private Usuario_Data: any;
  private Jugadores_Observable: FirebaseListObservable<any>;
  private Grupo: String;
  private Current_User: any;
  private Universidad: String;

  
  constructor(public viewCtrl: ViewController, public database: AngularFireDatabase, private afAuth: AngularFireAuth) {
      this.authState = afAuth.authState;
      this.authState.subscribe((user: firebase.User) => {
        if  (user) 
        { 
          this.Current_User = user;
          this.Usuario_Observable = this.database.object('/Usuario/'+user.uid);
          this.Usuario_Observable.subscribe(snapshot => {
            this.Usuario_Data = snapshot;
            //agarramos el grupo al que pertenece
            this.Grupo = this.Usuario_Data.GrupoActual;
            this.Universidad = this.Usuario_Data.Universidad;
            this.Jugadores_Observable = this.database.list('/Temporada/Temporada1/'+this.Universidad+'/'+this.Grupo+'/Jugadores', 
              {
                query:{
                  orderByChild: 'Puntaje',
                }
              }
            );

          });
        }
      });
  }

  //funcion de cierre del modal
  CloseModal(){
    this.viewCtrl.dismiss();
  }

}
