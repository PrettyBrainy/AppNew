import { Router } from '@angular/router';
import { AuthService } from './services/user/auth.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { firebaseConfig } from './credentials';
import { Plugins } from '@capacitor/core';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private authService: AuthService,
    private router: Router

  ) {
    this.initializeApp();
    
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.hide();
      firebase.initializeApp(firebaseConfig);
    });
  }
}
