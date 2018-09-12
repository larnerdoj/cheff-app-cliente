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

}
