import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CardapioPage} from "../cardapio/cardapio";
//import {ErrorTokenPage} from "../error-token/error-token";
import {HttpService} from "../../providers/http";
import {GlobalsService} from "../../providers/globals";
import {ErrorTokenPage} from "../error-token/error-token";
import {StorageService} from "../../providers/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  verCardapio () {
    this.navCtrl.push(CardapioPage);
  }

  // getToken(strToken) {
  //   //return this.http.get(this.getBaseApiPath + `/comandas/mobile/login/token/SXdaV1UwTkRB/${this.numEmpresa}`);
  //   return this.http.get(this.getBaseApiPath + `/comandas/mobile/login/token/${strToken}/${this.numEmpresa}`);
  //   //return this.http.get(this.getBaseApiPath + `/produtos/${strToken}.json`);
  // }

  //login(strToken) {
    //console.log(this.getToken);
    // this.authServiceProvider.getToken(this.strToken).subscribe(
    //   data=> {
    //     let retorno = data.json();
    //     console.log(retorno);
    //     this.blStatusComanda = retorno.sts;
    //     this.strTokenComanda = retorno.cod;
    //
    //     if ((this.strToken == this.strTokenComanda) && (this.blStatusComanda == true)) {
    //       this.navCtrl.push(CardapioPage);
    //       console.log(this.strTokenComanda);
    //     } else {
    //       this.navCtrl.push(ErrorTokenPage);
    //       console.log(this.strTokenComanda);
    //     }
    //   }, error=> {
    //     console.log(error);
    //   }
    // )
  //}

  //VXpPV0l5T1RB

  getLogin (form) {
    console.log(form.value);
    this.HttpService.JSON_GET(`/comandas/mobile/login/token/${form.value.strToken}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
      .then(
        (res) =>{
          //console.log(res.json());
          if (res.json() === 'Comanda não encontrada!') {
            this.navCtrl.push(ErrorTokenPage);
            setTimeout(() => {
              this.navCtrl.push(LoginPage, { animate: true, direction: 'back' })
            }, 5000);
          }else {
            this.StorageService.setItem('isLogged', true);
            this.StorageService.setItem('nomeComanda', res.json().name);
            this.StorageService.setItem('codigoComanda', res.json().code);
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
