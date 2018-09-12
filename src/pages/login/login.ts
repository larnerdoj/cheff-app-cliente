import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CardapioPage} from "../cardapio/cardapio";
//import {ErrorTokenPage} from "../error-token/error-token";
import {HttpService} from "../../providers/http";
import {GlobalsService} from "../../providers/globals";
import {ErrorTokenPage} from "../error-token/error-token";
import {StorageService} from "../../providers/storage";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  blStatusComanda: boolean;
  strTokenComanda: string;
  strToken: string;
  strNomeComanda: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private authServiceProvider: AuthServiceProvider
    private HttpService: HttpService,
    private GlobalsService: GlobalsService,
    private StorageService: StorageService
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  /***************
   FAZ LOGIN DO USUARIO COM O CÓDIGO DA COMANDA
   SE A COMANDA FOR INVALIDA ELE ENVIA PARA A PAGINA DE ERRO E RETORNA PARA O LOGIN 5 SEGUNDOS DEPOIS
   ***************/
  getLogin (form) {
    console.log(form.value);
    this.HttpService.JSON_GET(`/comandas/mobile/login/token/${form.value.strToken}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
      .then(
        (res) =>{
          console.log(res.json());
          if (res.json() === 'Comanda não encontrada!') {
            this.navCtrl.push(ErrorTokenPage);
            setTimeout(() => {
              this.navCtrl.push(LoginPage, { animate: true, direction: 'back' })
            }, 5000);
          }else {
            console.log(res.json());
            this.StorageService.setItem('isLogged', true);
            this.StorageService.setItem('nomeComanda', res.json().name);
            this.StorageService.setItem('codigoComanda', res.json().code);
            this.StorageService.setItem('idComanda', res.json().id);
            this.StorageService.setItem('userId', res.json().user_id);
            this.StorageService.setItem('credit', res.json().credit);
            this.StorageService.setItem('mesa', res.json().mesa);
            this.StorageService.setItem('atendente', res.json().atendente);
            this.navCtrl.setRoot(CardapioPage, { paramStrToken: form.value.strToken });
          }


        },
        (error) =>{
          console.log(error);
          //this.navCtrl.setRoot(ErrorTokenPage);
          this.StorageService.setItem('isLogged', false);
          this.navCtrl.push(ErrorTokenPage);
        }
      )
  }

}
