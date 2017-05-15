import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-inscripcion',
  templateUrl: 'inscripcion.html',
})
export class Inscripcion {

  data: FirebaseObjectObservable<any>;
  dataSnap: any;
  jugadorObservable: FirebaseObjectObservable<any>;
  jugadorSnap: any;
  grupo: String;
  private sala: any;
  private sala_nombre: string;
  private authState: Observable<firebase.User>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, private afAuth: AngularFireAuth) {
  //recibimos lo que le apsaron a esta vista
  this.sala = navParams.get('json');
  console.log(this.sala);
  this.sala_nombre = this.sala.Nombre;
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
                    //agarramos el grupo al que pertenece
                    this.grupo = this.dataSnap.GrupoActual;
                    //agarramos al jugador
                    this.jugadorObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/'+this.dataSnap.$key);
                    //hacemos el snapshot del usuario
                    this.jugadorObservable.subscribe(snapshot => {
                        this.jugadorSnap = snapshot;
                    });          
             });     
  });
  
  }

  

}
