import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Leaderboard } from '../pages/leaderboard/leaderboard';
import { PatchNotes } from '../pages/patch-notes/patch-notes';
import { Perfil } from '../pages/perfil/perfil';
import { Universidad } from '../pages/universidad/universidad';
import { Inscripcion } from '../pages/inscripcion/inscripcion';
import { Grupos } from '../pages/grupos/grupos'; 
import { Login } from '../pages/Login/Login';
import { Murdered } from '../pages/murdered/murdered';
import { LeaderboardModal } from '../pages/leaderboard-modal/leaderboard-modal';

import { AuthData } from '../providers/auth-data';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import { CommonModule } from '@angular/common';

export const firebaseConfig = {
  
    apiKey: "AIzaSyA471ayDh0NKDxDuqRX3-69rMbQsDJ73h4",
    authDomain: "slayerio-b97b8.firebaseapp.com",
    databaseURL: "https://slayerio-b97b8.firebaseio.com",
    projectId: "slayerio-b97b8",
    storageBucket: "slayerio-b97b8.appspot.com",
    messagingSenderId: "571038688296"
  
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Inscripcion,
    Perfil, 
    PatchNotes,
    Universidad,
    Grupos,
    Leaderboard,
    Login,
    Murdered,
    LeaderboardModal,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Inscripcion, 
    Perfil, 
    PatchNotes,
    Universidad,
    Grupos,
    Leaderboard,
    Login,
    Murdered,
    LeaderboardModal

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    AngularFireAuth,
    AuthData
  ]
})
export class AppModule {}
