import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the Murdered page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-murdered',
  templateUrl: 'murdered.html',
})
export class Murdered {

  Parametros: any;
  private authState: Observable<firebase.User>;
  Jugador_Actual_Observable: FirebaseObjectObservable<any>;
  Jugador_Actual_Snapshot: any;
  Usuario_Observable: FirebaseObjectObservable<any>;
  Usuario_Snapshot: any;
  Jugador_Muerto_Observable: FirebaseObjectObservable<any>;
  Jugador_Muerto_Snapshot: any;
  Nombre_Jugador_Asesinado: any;
  Nuevo_Objetivo_Observable: FirebaseObjectObservable<any>;
  Nombre_Nuevo_Objetivo: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public database: AngularFireDatabase) {
  this.Parametros = navParams.get('Objetivo_Asesinado');
  this.authState = afAuth.authState;
  this.authState.subscribe((user: firebase.User) => {

    this.Usuario_Observable = this.database.object('Usuario/'+user.uid);
    this.Usuario_Observable.subscribe(snapshot =>{
      this.Usuario_Snapshot = snapshot;
      this.Jugador_Actual_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Usuario_Snapshot.$key);
      this.Jugador_Actual_Observable.subscribe(snapshot1 =>{
        this.Jugador_Actual_Snapshot = snapshot1;
        this.Jugador_Muerto_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Parametros);
        this.Jugador_Muerto_Observable.subscribe(snapshot2 =>{
          this.Jugador_Muerto_Snapshot = snapshot2;
          this.Nombre_Jugador_Asesinado = this.Jugador_Muerto_Snapshot.Nombre;
          this.Nuevo_Objetivo_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Jugador_Muerto_Snapshot.Objetivo);
          this.Nuevo_Objetivo_Observable.subscribe(snapshot3 =>{
            this.Nombre_Nuevo_Objetivo = snapshot3.Nombre;
          });
          //AQUI ESTABAN ANTES LOS UPDATES Y SETS
          
        });
         
      });
    });
    this.Jugador_Actual_Observable.update({
            Objetivo: this.Jugador_Muerto_Snapshot.Objetivo,
            Puntaje: (this.Jugador_Actual_Snapshot.Puntaje + 500)
    });
    this.Jugador_Muerto_Observable.set({
            Muerto: true,
    });
    this.Jugador_Muerto_Observable.update({
            Objetivo: 'no',
    })
    
    
      
  });
     


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Murdered');
  }

}
