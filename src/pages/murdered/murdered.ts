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

  public Parametros: any;
  private authState: Observable<firebase.User>;
  private Jugador_Actual_Observable: FirebaseObjectObservable<any>;
  private Jugador_Actual_Snapshot: any;
  private Usuario_Observable: FirebaseObjectObservable<any>;
  private Usuario_Snapshot: any;
  private Jugador_Muerto_Observable: FirebaseObjectObservable<any>;
  private Jugador_Muerto_Snapshot: any;
  private Nombre_Jugador_Asesinado: string;
  private Nuevo_Objetivo_Observable: FirebaseObjectObservable<any>;
  private Nombre_Nuevo_Objetivo: string;
  private puntaje: any;
  private objetivonuevo: any;
  private flag: boolean; //Este flag nos ayuda a no repetir la actualizacion de la informacion por la forma en al que funciona el subscribe
  private Partida_Actual_Observable: FirebaseObjectObservable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public database: AngularFireDatabase) {
  this.flag = true;
  this.Parametros = navParams.get('Objetivo_Asesinado');
  this.authState = afAuth.authState;
  this.authState.subscribe((user: firebase.User) => {

    //Se busca la informacion del usuario con su id en la seccion de la bd de Usuario
    this.Usuario_Observable = this.database.object('Usuario/'+user.uid);
    this.Usuario_Observable.subscribe(snapshot => {
      this.Usuario_Snapshot = snapshot;

      //Se busca informacion del jugador almacenada en la partida con informacion encontrada en la busqueda anterior
      this.Jugador_Actual_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Usuario_Snapshot.$key);
      this.Jugador_Actual_Observable.subscribe(snapshot1 => { 

        
        //Se busca la informacion informacion del jugador que fue asesinado
        this.Jugador_Actual_Snapshot = snapshot1;
        this.Jugador_Muerto_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Parametros);
        this.Jugador_Muerto_Observable.subscribe(snapshot2 => {
          this.Jugador_Muerto_Snapshot = snapshot2;

          //Se busca la informacion del objetivo del jugador que fue asesinado
          this.Nuevo_Objetivo_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual+'/Jugadores/'+this.Jugador_Muerto_Snapshot.Objetivo);
          this.Nuevo_Objetivo_Observable.subscribe(snapshot3 => {
            
            // Sección que actualiza los datos correspondientes
            if(this.flag){
            this.puntaje = this.Jugador_Actual_Snapshot.Puntaje + 500;
            this.Jugador_Actual_Observable.update({
                Objetivo: this.Jugador_Muerto_Snapshot.Objetivo, // Se le asigna el objetivo del jugador muerto
                Puntaje: this.puntaje                            // Se le actualiza su puntaje
              });


              
              this.Jugador_Muerto_Observable.update({
                Objetivo: 'no',
              });

              this.Nombre_Jugador_Asesinado = this.Jugador_Muerto_Snapshot.Nombre;
              this.Nombre_Nuevo_Objetivo = snapshot3.Nombre;
              
              //El siguiente if() determina si el juego termina
              if(this.Jugador_Actual_Snapshot.Objetivo = this.Jugador_Actual_Snapshot.$key){
                this.Partida_Actual_Observable = this.database.object('Temporada/Temporada1/'+this.Usuario_Snapshot.Universidad+'/'+this.Usuario_Snapshot.GrupoActual);
                this.Partida_Actual_Observable.update({
                  Ganador: this.Jugador_Actual_Snapshot.Nombre
                });

              }

              this.flag = false;
            }
            
          });
          
          
        });
        
         
      });

    });
    
      
    

  });
}

}
