/*--------------
V 1.0.0 - Criado por Larner Diogo

DESCIÇÃO:
Funcoes e compartilhamentos globais


COMPONENTS
***********************************************************/
import {Injectable, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpService} from "./http";
import {LoginPage} from "../pages/login/login";
import {StorageService} from "./storage";
import {AlertController, Nav, NavController} from "ionic-angular";
import {CurrencyPipe} from "@angular/common";

@Injectable()
export class GlobalsService {
    VersaoAPP = '1.0.0';
    lojaAndroid = '';
    lojaApple = '';
    lojaWindows = '';
    strEmpresa: string = '2';
    rootPage: any;
    pesquisa: string;
    descricao: string;
    arPesquisa: Array<any>;
    resultadoPesquisa: string;
    arResultadoPesquisa: Array<any>;

    constructor(
        public DomSanitizer: DomSanitizer,
        private HttpService: HttpService,
        private StorageService: StorageService,
        public currencyPipe: CurrencyPipe,
        public AlertController: AlertController
    ) { }

    //GERANDO IMAGEM ALEATORIA
    getImgRandom() {
        return `assets/imgs/backs/0${Math.floor(Math.random() * (5 - + 1)) + 1}.png`;
    }

    logout() {
      this.StorageService.setItem('isLogged', false);
      this.StorageService.setItem('nomeComanda', '');
      this.StorageService.setItem('codigoComanda', '');
      this.rootPage = LoginPage;
    }

    getCurrency(amount: number) {
      return this.currencyPipe.transform(amount, 'BRL');
    }

    /***************
     ALERT FUNCIONALIDADE EM DESENVOLVIMENTO
     ***************/
    desenvolvimento(){
      let alert = this.AlertController.create({
        title: 'Em breve!',
        message: `Esta funcionalidade está em desenvolvimento.`,
        buttons: [
          {
            text: 'Ok',
            handler: (res) => {}
          }
        ]
      });
      alert.present();
    }

}
