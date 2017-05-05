import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Inscripcion } from '../pages/inscripcion/inscripcion';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    ListPage,
    Inscripcion
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Inscripcion
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
