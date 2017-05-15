import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

private email: string;
private pass: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  entrarConCorreo() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.pass)
      .then(res => this.navCtrl.setRoot(HomePage));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}