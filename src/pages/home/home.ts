import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabaseModule, FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Inscripcion } from '../inscripcion/inscripcion';
import { Murdered } from '../murdered/murdered';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

// Atributos
  private plt:Platform;
  private opcionesDeScan: BarcodeScannerOptions;
  private Usuario_Id: string;
  private ObjetivoEscaneado_Id: string;
  private ObjetivoEscaneado_Observable: FirebaseObjectObservable<any>;
  private ObjetivoEscaneado: any;
  private authState: Observable<firebase.User>;
  group: FirebaseListObservable<any>;
  temp: FirebaseListObservable<any>;
  uni: FirebaseListObservable<any>;
  jugador: FirebaseObjectObservable<any>;
  private currentUser: firebase.User;
  json: any;
  public dataSnap: any;
  public jugadorSnap: any;
  grupo: String;
  puntaje: string;
  objetivolisto: any;
  ObjetivoListoId: string;
  ObjetivoNombre: string;
  data: FirebaseObjectObservable<any>;
  jugadorObservable: FirebaseObjectObservable<any>;
  targetObservable: FirebaseObjectObservable<any>;

  
// Constructor
  constructor(public navCtrl: NavController, public alertController: AlertController, private platform: Platform, 
  public database: AngularFireDatabase, private barcode: BarcodeScanner, private afAuth: AngularFireAuth) 
  {
      this.authState = afAuth.authState;
      this.json = afAuth.auth.currentUser;
      this.authState.subscribe((user: firebase.User) => {
            //console.log('user is: ' + user.uid);
            this.currentUser = user;

            this.data = this.database.object('/Usuario/'+user.uid);
            this.data.subscribe(snapshot => {
                    //armamos el objeto
                    this.dataSnap = snapshot;
                    //agarramos el grupo al que pertenece
                    this.grupo = this.dataSnap.GrupoActual;
                    //agarramos al jugador
                    console.log(this.dataSnap.$key);
                    this.jugadorObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/Jugadores/'+this.dataSnap.$key);
                    //hacemos el snapshot del jugador
                    this.jugadorObservable.subscribe(snapshot2 => {
                        this.jugadorSnap = snapshot2;
                        console.log(this.jugadorSnap.Puntaje);
                        this.puntaje = this.jugadorSnap.Puntaje;
                        console.log(this.jugadorSnap.Objetivo);

                        this.targetObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/Jugadores/'+this.jugadorSnap.Objetivo);
                        this.targetObservable.subscribe(snapshot3 => {
                        this.objetivolisto = snapshot3;
                        this.ObjetivoNombre = this.objetivolisto.Nombre;
                        this.ObjetivoListoId = this.objetivolisto.$key;
                        });
                        
                    }); 

             });
        });
      this.plt = platform;
      this.opcionesDeScan = {
        prompt:'¡Escanea el codigo QR de tu objetivo!'
      }
      this.group = this.database.list('/Temporada/Temporada1/Unimet');
      this.temp = this.database.list('/Temporada');
      this.jugador = this.database.object('/Temporada/Temporada1/Unimet/Grupo1/Jugadores/');
      this.uni = this.database.list('/Temporada/Temporada1', {
        query: {
          orderByKey: true,
          equalTo: 'Unimet'
        }
      });
      
  }

  // Funciones

  public Asesinar()
  {
        console.log("entre en la funcion");
        this.data.subscribe(snapshot => {
                        //armamos el objeto
                        this.dataSnap = snapshot;
                        //agarramos el grupo al que pertenece
                        this.grupo = this.dataSnap.GrupoActual;
                        //agarramos al jugador
                        this.jugadorObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/Jugadores/'+this.dataSnap.$key);
                        //hacemos el snapshot del jugador
                        this.jugadorObservable.subscribe(snapshot2 => {
                        this.jugadorSnap = snapshot2;
                        console.log("Hare console log:");
                        console.log(snapshot2.Objetivo);
                      });
                      });
        this.plt.ready().then(() => {
            this.barcode.scan(this.opcionesDeScan).then((resultado) => {
                if (!resultado.cancelled)
                {
                  this.ObjetivoEscaneado_Id = resultado.text; // Buscar con este id
                  this.authState.subscribe((user: firebase.User) => {
                      //console.log('user is: ' + user.uid);
                      this.currentUser = user;
                      this.data = this.database.object('/Usuario/'+user.uid);
                      this.data.subscribe(snapshot => {
                        //armamos el objeto
                        this.dataSnap = snapshot;
                        //agarramos el grupo al que pertenece
                        this.grupo = this.dataSnap.GrupoActual;
                        //agarramos al jugador
                        this.jugadorObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/Jugadores/'+this.dataSnap.$key);
                        //hacemos el snapshot del jugador
                        this.jugadorObservable.subscribe(snapshot2 => {
                        this.jugadorSnap = snapshot2;
                        // if (this.ObjetivoEscaneado_Id == snapshot2.Objetivo) 
                        // {  
                          this.navCtrl.push( Murdered, {Objetivo_Asesinado: this.ObjetivoEscaneado_Id} ); // Cambiar esto a modals si se puede
                        // }
                        // else
                        // {
                        //   let VentanaError = this.alertController.create({
                        //     title: "Error",
                        //     message: " El id del jugador escaneado no coincide con el de tu objetivo ",
                        //     buttons: [
                        //     {
                        //       text: "Ok",
                        //       handler: data => {
                        //       }
                        //     }
                        //     ]
                        //   });
                        // }
                        });  
                      });
                  });                                      
                }
            }, (error) => {
                  let VentanaError = this.alertController.create({
                  title: "Error",
                  message: "¡Ups! No logramos encontrar al usuario. Verifique tu conexión de internet en intentalo nuevamente por favor. ",
                  buttons: [
                  {
                    text: "Ok",
                    handler: data => {
                    }
                  }
                  ]
              });

            });
        });
        
  }
  private signOut() 
  {
    this.afAuth.auth.signOut();
  }

  gotoGroup(g) {
    this.navCtrl.push(Inscripcion, {group: this.group});
  }

}
