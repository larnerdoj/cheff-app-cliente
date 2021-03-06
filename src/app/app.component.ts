/**********************************************
Criado por Larner Diogo - PADRONIZADO

DESCIÇÃO:
Componente principal da aplicacao


COMPONENTS
***********************************************/
import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpService } from "../providers/http";

/**********************************************
SERVICES
***********************************************/

/**********************************************
PAGES
***********************************************/
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { CardapioPage } from "../pages/cardapio/cardapio";
import { ProdutosPage } from "../pages/produtos/produtos";
import { DetalheProdutoPage } from "../pages/detalhe-produto/detalhe-produto";
import { ErrorTokenPage } from "../pages/error-token/error-token";
import { StorageService } from "../providers/storage";
import { GlobalsService } from "../providers/globals";
import { ComandaFinalizadaPage } from "../pages/comanda-finalizada/comanda-finalizada";
import { CarrinhoPage } from "../pages/carrinho/carrinho";
import { CarrinhoProvider } from "../providers/carrinho";
import { ListPage } from "../pages/list/list";
import { PesquisaPage } from '../pages/pesquisa/pesquisa';

@Component({
  templateUrl: 'app.html'
})
export class CheffCliente {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  arImagens: string[];
  strNumero: string;
  public strToken;

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    //public navCtrl: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    private HttpService: HttpService,
    public splashScreen: SplashScreen,
    private GlobalsService: GlobalsService,
    private StorageService: StorageService,
    public CarrinhoProvider: CarrinhoProvider,
    public AlertController: AlertController
  ) {
    this.initializeApp();

    this.pages = [
      { icon: 'md-arrow-dropright', title: 'Cardapio', component: CardapioPage },
      { icon: 'md-arrow-dropright', title: 'Procurar', component: PesquisaPage },
      { icon: 'md-arrow-dropright', title: 'Minha Sacola', component: CarrinhoPage },
      { icon: 'md-arrow-dropright', title: 'Meus pedidos', component: CarrinhoPage }
    ];

    //CRIACÃO DA VÁRIAVEL DE LOGGED, MANTEM O USUÁRIO LOGADO ATÉ A COMANDA SER FINALIZADA
    if (this.StorageService.getItem('isLogged') === 'true') {
      this.GlobalsService.getImgRandom();
      this.rootPage = CardapioPage;
    } else {
      this.GlobalsService.getImgRandom();
      this.rootPage = LoginPage;
    }

    /***************
     VERIFICA VIA NUMERO DO TOKEN A CADA 10 SEGUNDOS SE A COMANDA ESTA ABERTA
     SE ESTIVER FECHADA ELE LIMPA AS VARIAVEIS DE STORAGE E ENVIA O USUÁRIO PARA A PÁGINA DE COMANDA FINALIZADA
     ***************/
    if (this.StorageService.getItem('codigoComanda') == null || this.StorageService.getItem('codigoComanda') == 'null' || this.StorageService.getItem('codigoComanda') == undefined || this.StorageService.getItem('codigoComanda') == 'undefined' || this.StorageService.getItem('codigoComanda') == '') {
      this.rootPage = LoginPage;
    } else {
      setInterval(() => {

        if (this.StorageService.getItem('isLogged') === 'true') {
          this.HttpService.JSON_GET(`/comandas/mobile/login/token/${this.StorageService.getItem('codigoComanda')}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
            .then(
              (res) => {
                //console.log(res.json());
                if (res.json() === 'Comanda não encontrada!') {
                  this.rootPage = ComandaFinalizadaPage;
                  this.StorageService.setItem('isLogged', false);
                  //this.StorageService.clear();
                  setTimeout(() => {
                    this.rootPage = LoginPage;
                  }, 5000);
                  //console.log("Passou aqui!");
                }

              },
              (error) => {
                //console.log(error);
                this.rootPage = LoginPage;
                //console.log("Passou aqui!");
              }
            )

        } else {
          this.rootPage = LoginPage;
        }
      }, 10000);
    }

    //console.log(this.CarrinhoProvider.itensCart);
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

  exitApp() {
    let alert = this.AlertController.create({
      title: 'Sair',
      message: `Deseja fechar o APP?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Sair',
          handler: (res) => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

}
