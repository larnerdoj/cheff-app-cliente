/**********************************************
Criado por Larner Diogo - PADRONIZADO

DESCIÇÃO:
Modulo principal da aplicacao


COMPONENTS
***********************************************/
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

/**********************************************
GLOBALS - SHAREDS
***********************************************/

/**********************************************
SERVICES
***********************************************/

/**********************************************
PAGES
***********************************************/
import { CheffCliente } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {CardapioPage} from "../pages/cardapio/cardapio";
import {ProdutosPage} from "../pages/produtos/produtos";
import {DetalheProdutoPage} from "../pages/detalhe-produto/detalhe-produto";
import {HttpService} from "../providers/http";
import {GlobalsService} from "../providers/globals";
import {StorageService} from "../providers/storage";
import {ErrorTokenPage} from "../pages/error-token/error-token";
import {ComandaFinalizadaPage} from "../pages/comanda-finalizada/comanda-finalizada";
import {CarrinhoPage} from "../pages/carrinho/carrinho";

@NgModule({
  declarations: [
    CheffCliente,
    HomePage,
    ListPage,
    LoginPage,
    CardapioPage,
    ProdutosPage,
    DetalheProdutoPage,
    ErrorTokenPage,
    ComandaFinalizadaPage,
    CarrinhoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(CheffCliente,{
      activator: 'ripple',
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back-outline',
      iconMode: 'ios',
      menuType: 'push',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      tabsHighlight: true,
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CheffCliente,
    HomePage,
    ListPage,
    LoginPage,
    CardapioPage,
    ProdutosPage,
    DetalheProdutoPage,
    ErrorTokenPage,
    ComandaFinalizadaPage,
    CarrinhoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt-BR'},

    CurrencyPipe,
    DatePipe,
    HttpService,
    GlobalsService,
    StorageService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CheffClienteModule {}
