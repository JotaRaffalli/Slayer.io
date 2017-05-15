import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { Leaderboard } from '../pages/leaderboard/leaderboard';
import { PatchNotes } from '../pages/patch-notes/patch-notes';
import { Perfil } from '../pages/perfil/perfil';
import { Universidad } from '../pages/universidad/universidad';
import { Inscripcion } from '../pages/inscripcion/inscripcion';
import { Grupos } from '../pages/grupos/grupos'; 
import { Login } from '../pages/Login/Login'; 

import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
  private afAuth: AngularFireAuth) 
  {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Perfil', component: Perfil},
      { title: 'Temporada', component: Universidad },
      { title: 'Leaderboard', component: Leaderboard },
      { title: 'Patch Notes', component: PatchNotes},
      { title: 'ListPage', component: ListPage }
    ];

    const authObserver = afAuth.authState.subscribe(user => {

      if (user) {
        this.rootPage = HomePage;
        
      } else {
        this.rootPage = Login;
        
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
