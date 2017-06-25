import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabaseModule, FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Inscripcion } from '../inscripcion/inscripcion';
import { Murdered } from '../murdered/murdered';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { LeaderboardModal } from '../leaderboard-modal/leaderboard-modal';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

// Atributos
  private plt:Platform; // Objeto para comprobar estatus de los dispositivos
  private opcionesDeScan: BarcodeScannerOptions; 
  private Usuario_Id: string;
  private ObjetivoEscaneado_Id: string;
  private ObjetivoEscaneado_Observable: FirebaseObjectObservable<any>;
  private ObjetivoEscaneado: any; 
  private authState: Observable<firebase.User>;
  private ProgressBarComponent;
  group: FirebaseListObservable<any>;
  temp: FirebaseListObservable<any>;
  uni: FirebaseListObservable<any>;
  jugador: FirebaseObjectObservable<any>;
  private currentUser: firebase.User;
  json: any;
  public dataSnap: any;
  public jugadorSnap: any;
  grupo: string; 
  puntaje: string;
  objetivolisto: any;
  ObjetivoListoId: string;
  ObjetivoNombre: string;
  jugadorNombre: string;
  frase: string;
  emblema: string;
  data: FirebaseObjectObservable<any>;
  jugadorObservable: FirebaseObjectObservable<any>;
  targetObservable: FirebaseObjectObservable<any>;
  private loadProgress: number; //Barra de nivel
  private relacion_nivel_porcentaje: number = 50;
  
// Constructor
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertController: AlertController, private platform: Platform, 
  public database: AngularFireDatabase, private barcode: BarcodeScanner, private afAuth: AngularFireAuth) 
  {
      /* Primero comprobemos que efectivamente el usuario esta loggeado 
      y nos suscribimos a él a través de programación reactiva para fijarnos
      en cambios que puedan ocurrirle durante su sesión. 
      */
      this.authState = afAuth.authState;
      this.json = afAuth.auth.currentUser;
      this.authState.subscribe((user: firebase.User) => {
            this.currentUser = user; // Guardamos el usuario dentro de un objeto de tipo Firebase User

            if  (user) 
            { 
              this.data = this.database.object('/Usuario/'+user.uid); 
              
              // Data tendra la información del documento Usuarios de la bd según el id extraido anteriormente
                    this.data.subscribe(snapshot => {
                    //armamos el objeto
                    this.dataSnap = snapshot;
                    this.frase = this.dataSnap.Frase; // Titulo del jugador
                    this.emblema = this.dataSnap.Emblema; // Emblema del jugador
                    //agarramos el grupo al que pertenece
                    this.grupo = this.dataSnap.GrupoActual;
                    //agarramos al jugador
                    console.log(this.dataSnap.$key);
                    this.jugadorObservable = this.database.object('/Temporada/Temporada1/'+this.dataSnap.Universidad+'/'+this.grupo+'/Jugadores/'+this.dataSnap.$key);
                    //hacemos el snapshot del jugador
                    this.jugadorObservable.subscribe(snapshot2 => {
                        this.jugadorSnap = snapshot2;
                        this.jugadorNombre = this.jugadorSnap.Nombre; 
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
            }
        });


      // Inicializamos la variable que controla los dispositivos con Cordova
      this.plt = platform;
      // Extras del scanner
      this.opcionesDeScan = {
        prompt:'¡Escanea el codigo QR de tu objetivo!'
      }
      // Extraemos toda la informació relevante del jugador que sea necesaria para poder jugar
      this.group = this.database.list('/Temporada/Temporada1/Unimet');
      this.temp = this.database.list('/Temporada');
      this.jugador = this.database.object('/Temporada/Temporada1/Unimet/Grupo1/Jugadores/');
      this.uni = this.database.list('/Temporada/Temporada1', {
        query: {
          orderByKey: true,
          equalTo: 'Unimet' // Estatico, cambiar en supuesto sprint 3 según cambios en la BD
        }
      });
      
      // Nivel del jugador expresado en una barra de nivel
      this.loadProgress= this.relacion_nivel_porcentaje; 

  }

  // Funciones
  public Asesinar()
  {
        console.log("entre en la funcion");
        this.plt.ready().then(() => {
            this.barcode.scan(this.opcionesDeScan).then((resultado) => {
                if (!resultado.cancelled) 
                {
                  this.ObjetivoEscaneado_Id = resultado.text; // Buscar con este id
                  this.authState.subscribe((user: firebase.User) => {
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
                        // Luego comprobamos que efctivamente se trate del objetivo que se le asignó
                        if (this.ObjetivoEscaneado_Id == snapshot2.Objetivo) 
                         {  
                          this.navCtrl.push(Murdered, {Objetivo_Asesinado: this.ObjetivoEscaneado_Id}); 
                         }   
                         else
                         {
                           let VentanaError = this.alertController.create({
                             title: "Error",
                             message: " El id del jugador escaneado no coincide con el de tu objetivo ",
                              buttons: [
                             {
                               text: "Ok",
                               handler: data => {
                               }
                             }
                             ]
                           });
                         }
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

  GoToLeaderboard() {
    let myModal = this.modalCtrl.create(LeaderboardModal);
    myModal.present();
  }

}
