import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public CarrinhoProvider: CarrinhoProvider
  )
  {
  }

  ionViewDidLoad() {
    // this.strToken = this.navParams.get("paramStrToken");
    // //console.log(this.strToken);
    // this.HttpService.JSON_GET(`/comandas/mobile/login/token/${this.strToken}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
    //   .then(
    //     (res) =>{
    //       //console.log(res.json());
    //       this.strNomeCliente = res.json().name;
    //       this.strNumberToken = res.json().code;
    //     },
    //     (error) =>{
    //       console.log(error);
    //     }
    //   )

    /***************
     GERA O ARRAY COM TODAS AS CATEGORIAS
     ***************/
    this.HttpService.JSON_GET(`/categorias/${this.GlobalsService.strEmpresa}`, false, true, 'json')
      .then(
        (res) => {
          //console.log(res.json());
          this.arListaCategorias = res.json();
        }
      ),
      (error) => {
        console.log(error);
      }
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
