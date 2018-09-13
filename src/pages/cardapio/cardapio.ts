import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProdutosPage} from "../produtos/produtos";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {LoginPage} from "../login/login";
import {ErrorTokenPage} from "../error-token/error-token";
import {HttpService} from "../../providers/http";
import {CarrinhoPage} from "../carrinho/carrinho";
import {CarrinhoProvider} from "../../providers/carrinho";
import {PesquisaPage} from "../pesquisa/pesquisa";

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  public strToken;
  strNomeCliente: string;
  strNumberToken: string;
  arListaCategorias: Array<any>;
  arInsumos = [ 'Palitos', 'Guardanapos', 'Condimentos' ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StorageService: StorageService,
    private GlobalsService: GlobalsService,
    private HttpService: HttpService,
    public CarrinhoProvider: CarrinhoProvider,
    public AlertController: AlertController,
    public LoadingController: LoadingController
  )
  {
  }

  ionViewDidLoad() {

    /***************
     GERA O ARRAY COM TODAS AS CATEGORIAS
     ***************/
    //LOADING
    let loading = this.LoadingController.create({
      spinner: 'crescent',
      content: 'Carregando Categorias'
    });
    loading.present().then(() => {
      this.HttpService.JSON_GET(`/categorias/${this.GlobalsService.strEmpresa}`, false, true, 'json')
        .then(
          (res) => {
            //console.log(res.json());
            this.arListaCategorias = res.json();
            loading.dismiss();
          }
        ),
        (error) => {
          console.log(error);
          loading.dismiss();
        }
    });
  }

  /***************
   CAPTURA O ID E NOME DA CATEGORIA E ENVIA O USUÁRIO PARA A
   PÁGINA DE LISTAGEM DE PRODUTOS DA CATEGORIA
   ***************/
  detalheCategoria(idCategoria) {
    this.navCtrl.push(ProdutosPage, { id: idCategoria.id, categoria: idCategoria.categoria });
  }

  /***************
   ENVIA O USUÁRIO PARA A SACOLA
   ***************/
  verCarrinho() {
    this.navCtrl.push(CarrinhoPage);
  }

  /***************
   ENVIA O USUÁRIO PARA A PESQUISA
   ***************/
  pesquisar() {
    this.navCtrl.push(PesquisaPage);
  }

  limparMesa() {
    let alertConfirm = this.AlertController.create({
      title: 'Confirmação de Limpeza',
      message: `Deseja realmente solicitar a limpeza?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Limpar Mesa',
          handler: (res) => {
            this.HttpService.JSON_POST(`/impressao/limpar-mesa/ELGIN-1/null`, {mesa: this.StorageService.getItem('mesa'), cliente: this.StorageService.getItem('nomeComanda')}, false, true, 'json')
              .then(
                (res) => {
                  let alert = this.AlertController.create({
                    title: 'Limpeza da Musa',
                    message: `Sua mesa sera limpa em breve!`,
                    buttons: [
                      {
                        text: 'Ok',
                        handler: (res) => {
                          return true;
                        }
                      }
                    ]
                  });
                  alert.present();
                }, (error) => {
                  console.log(error);
                }
              )
          }
        }
      ]
    });
    alertConfirm.present();
  }

  reporInsumos() {
    let alert = this.AlertController.create();
    alert.setTitle('Quais Insumos Estão Faltando Na Sua Mesa?');

    for(let i = 0; i < this.arInsumos.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.arInsumos[i],
        value: this.arInsumos[i],
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Solicitar Insumo(s)',
      handler: data => {
        this.HttpService.JSON_POST(`/impressao/insumos/ELGIN-1/null`, {mesa: this.StorageService.getItem('mesa'), cliente: this.StorageService.getItem('nomeComanda'), insumos: data.toString()}, false, true, 'json')
          .then(
            (res) => {
              let alert = this.AlertController.create({
                title: 'Solicitação de Insumo',
                message: `Em breve você receberá o insumo solicitado na sua mesa!`,
                buttons: [
                  {
                    text: 'Ok',
                    handler: (res) => {
                      return true;
                    }
                  }
                ]
              });
              alert.present();
            }, (error) => {
              console.log(error);
            }
          )
      }
    });
    alert.present();
  }

  chamarGarcon() {
    let alertConfirm = this.AlertController.create({
      title: 'Chamada de Garçon',
      message: `Deseja realmente chamar o garçon?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Chamar Garçon',
          handler: (res) => {
            this.HttpService.JSON_POST(`/comandas/painel`, {mesa: this.StorageService.getItem('mesa'), atendente: this.StorageService.getItem('atendente')}, false, true, 'json')
              .then(
                (res) => {
                  return true
                }, (error) => {
                  console.log(error);
                }
              )
          }
        }
      ]
    });
    alertConfirm.present();
  }

}
