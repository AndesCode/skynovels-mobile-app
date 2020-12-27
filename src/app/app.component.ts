import { Component } from '@angular/core';
import { HelperService } from './services/helper.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentComponent = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private hs: HelperService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onActivate(event: any) {
    if (event.componentName) { 
      this.currentComponent = event.componentName;
      console.log(this.currentComponent);
      this.hs.getCurrentComponent(this.currentComponent);
    } else {
      this.currentComponent = null;
    }
    window.scrollTo(0, 0);
  }
}