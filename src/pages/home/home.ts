import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabaseModule, FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Inscripcion } from '../inscripcion/inscripcion';
import { Murdered } from '../murdered/murdered';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

// Atributos
  private plt:Platform;
  private opcionesDeScan: BarcodeScannerOptions;
  private Usuario_Id: string;
  private Objetivo_Id: string;
  private Objetivo_Observable: FirebaseObjectObservable<any>;
  private Objetivo: any;
  group: FirebaseListObservable<any>;
  temp: FirebaseListObservable<any>;
  uni: FirebaseListObservable<any>;
  user: any;
  json: any;
// Constructor
  constructor(public navCtrl: NavController, public alertController: AlertController, private platform: Platform, 
  public database: AngularFireDatabase, private barcode: BarcodeScanner, private afAuth: AngularFireAuth) 
  {
      this.user = afAuth.authState;
      this.json = afAuth.auth.currentUser;
      this.plt = platform;
      this.opcionesDeScan = {
        prompt:'¡Escanea el codigo QR de tu objetivo!'
      }
      this.group = this.database.list('/Temporada/Temporada1/Unimet');
      this.temp = this.database.list('/Temporada');
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

        this.plt.ready().then(() => {
            this.barcode.scan(this.opcionesDeScan).then((resultado) => {
                if (!resultado.cancelled) 
                {
                  this.Objetivo_Id = resultado.text; // Buscar con este id

                  this.Objetivo_Observable = this.database.object('/User/'+this.Usuario_Id+this.Objetivo_Id);
                  this.Objetivo_Observable.subscribe(snapshot => {
                    //armamos el objeto a pasar
                    this.Objetivo = snapshot;
                    this.Objetivo.id = this.Objetivo_Id;
                    this.navCtrl.push( Murdered, {Objetivo_Asesinado: this.Objetivo} ); // Cambiar esto a modals si se puede
                } );
                                           
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
