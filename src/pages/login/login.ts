import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from "../home/home";
import * as firebase from 'firebase/app';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

 email: string;
 pass: string;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController,
   public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  // Iniciar sesión según correo y contraseña
  entrarConCorreo() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.pass)
      .then(res => this.navCtrl.setRoot(HomePage))
      .catch(err => {
       this.presentAlert(); 
   });

   
  }

  //Funcion de Cierre de sesion
  signOut() {
    this.afAuth.auth.signOut();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  //Funcion de alerta al introducir data erronea
  private presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Puede que hayas introduciodo algo mal!',
      buttons: ['Ok']
    });
    alert.present();
  }
}
