import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DetalheProdutoPage} from "../detalhe-produto/detalhe-produto";
import {HttpService} from "../../providers/http";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {CarrinhoProvider} from "../../providers/carrinho";
import {CarrinhoPage} from "../carrinho/carrinho";
import {PesquisaPage} from "../pesquisa/pesquisa";

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public categoriaId;
  public categoriaNome;
  private qtd: string;
  arListaProdutos: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private HttpService: HttpService,
    private GlobalsService: GlobalsService,
    private StorageService: StorageService,
    public CarrinhoProvider: CarrinhoProvider,
    public AlertController: AlertController,
    public LoadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.categoriaId = this.navParams.get("id");
    this.categoriaNome = this.navParams.get("categoria");
    // CAPTURA O ID E NOME DA CATEGORIA RECEBIDOS DA PAGINA CARDÁPIO

    //console.log(this.categoriaNome);
    /***************
     GERA O ARRAY COM TODOS OS PRODUTOS DA CATEGORIA
     ***************/
      //LOADING
    let loading = this.LoadingController.create({
        spinner: 'crescent',
        content: 'Carregando Produtos'
      });
    loading.present().then(() => {
      this.HttpService.JSON_GET(`/produtos/${this.GlobalsService.strEmpresa}/comanda/${this.categoriaId}`, false, true, 'json')
        .then(
          (res) => {
            console.log(res.json());
            this.arListaProdutos = res.json();
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
   CAPTURA O ID E NOME DO PRODUTO E ENVIA O USUÁRIO PARA A
   PÁGINA DE DETALHES DO PRODUTO
   ***************/
  detalheProduto(produto) {
    this.navCtrl.push(DetalheProdutoPage, { id: produto.id, categoria: produto.categoria });
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
