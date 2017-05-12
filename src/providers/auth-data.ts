import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthData {
fireAuth: any;
 constructor(public afAuth: AngularFireAuth) {

    }

  // Funciones de autenticación
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
}