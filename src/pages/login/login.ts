import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CardapioPage } from "../cardapio/cardapio";
//import {ErrorTokenPage} from "../error-token/error-token";
import { HttpService } from "../../providers/http";
import { GlobalsService } from "../../providers/globals";
import { ErrorTokenPage } from "../error-token/error-token";
import { StorageService } from "../../providers/storage";
import { AlertService } from '../../providers/alert';

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
  qrCodeTxt: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private authServiceProvider: AuthServiceProvider
    private HttpService: HttpService,
    private GlobalsService: GlobalsService,
    private StorageService: StorageService,
    private BarcodeScanner: BarcodeScanner,
    private AlertService: AlertService,
    public LoadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  /***************
   FAZ LOGIN DO USUARIO COM O CÓDIGO DA COMANDA
   SE A COMANDA FOR INVALIDA ELE ENVIA PARA A PAGINA DE ERRO E RETORNA PARA O LOGIN 5 SEGUNDOS DEPOIS
   ***************/
  getLogin(form) {
    console.log(form.value);
    if (form.status === 'INVALID') {
      this.AlertService.showAlert('ATENÇÃO', 'Informe o token para continuar');
    } else {
      //LOADING
      let loading = this.LoadingController.create({
        spinner: 'crescent',
        content: 'Carregando'
      });
      loading.present().then(() => {
        this.HttpService.JSON_GET(`/comandas/mobile/login/token/${form.value.strToken}/${this.GlobalsService.strEmpresa}/true`, false, true, 'json')
          .then(
            (res) => {
              //console.log(res.json());
              if (res.json() === 'Comanda não encontrada!') {
                loading.dismiss();
                this.navCtrl.push(ErrorTokenPage);
                setTimeout(() => {
                  this.navCtrl.push(LoginPage, { animate: true, direction: 'back' })
                }, 5000);
              } else {
                //console.log(res.json());
                this.StorageService.setItem('isLogged', true);
                this.StorageService.setItem('nomeComanda', res.json().name);
                this.StorageService.setItem('codigoComanda', res.json().code);
                this.StorageService.setItem('idComanda', res.json().id);
                this.StorageService.setItem('userId', res.json().user_id);
                this.StorageService.setItem('credit', res.json().credit);
                this.StorageService.setItem('mesa', res.json().mesa);
                this.StorageService.setItem('atendente', res.json().atendente);

                //CARREGANDO CONFIGURACOES DA EMPRESA
                this.HttpService.JSON_GET(`/configuracoes/${this.GlobalsService.strEmpresa}`, false, true, 'json')
                  .then(
                    (res) => {
                      loading.dismiss();
                      this.StorageService.setItem('qtdVias', res.json().qtd_vias);
                      this.navCtrl.setRoot(CardapioPage, { paramStrToken: form.value.strToken });
                    },
                    (error) => {
                      console.log(error);
                      loading.dismiss();
                    }
                  )

              }
              //loading.dismiss();
            },
            (error) => {
              console.log(error);
              //this.navCtrl.setRoot(ErrorTokenPage);
              this.StorageService.setItem('isLogged', false);
              this.navCtrl.push(ErrorTokenPage);
              loading.dismiss();
            }
          )
      });
    }
  }

  getQRCode() {

    this.BarcodeScanner.scan().then((txtQrCode) => {
      this.qrCodeTxt = txtQrCode.text;
      let form = {};
      form['value'] = {};
      form['value']['strToken'] = txtQrCode.text;
      this.getLogin(form);

    }).catch(err => {
      this.AlertService.showAlert('ERRO', JSON.stringify(err));
    });

  }

}
