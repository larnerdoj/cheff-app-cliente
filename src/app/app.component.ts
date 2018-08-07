/**********************************************
Criado por Larner Diogo - PADRONIZADO

DESCIÇÃO:
Componente principal da aplicacao


COMPONENTS
***********************************************/
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**********************************************
SERVICES
***********************************************/

/**********************************************
PAGES
***********************************************/
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class CheffCliente {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#00d900');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
