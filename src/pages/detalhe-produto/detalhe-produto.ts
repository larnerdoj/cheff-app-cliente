import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProdutosPage} from "../produtos/produtos";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {HttpService} from "../../providers/http";
import {CarrinhoPage} from "../carrinho/carrinho";
import {CarrinhoProvider} from "../../providers/carrinho";
import {PesquisaPage} from "../pesquisa/pesquisa";

@IonicPage()
@Component({
  selector: 'page-detalhe-produto',
  templateUrl: 'detalhe-produto.html',
})
export class DetalheProdutoPage {

  strIdProduto: string;
  strCategoriaProduto: string;
  arDetalhesProduto: any;
  qtd: string;
  qtdProduto: number = 1;
  itensComanda: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private HttpService: HttpService,
    public StorageService: StorageService,
    private GlobalsService: GlobalsService,
    public CarrinhoProvider: CarrinhoProvider,
    public AlertController: AlertController,
    public LoadingController: LoadingController
  ) {

  }

  ionViewDidLoad() {
    // CAPTURA O ID E CATEGORIA DO PRODUTO RECEBIDOS DA PAGINA PRODUTOS
    this.strIdProduto = this.navParams.get("id");
    this.strCategoriaProduto = this.navParams.get("categoria");
    //console.log(this.strIdProduto);
    /***************
     GERA O ARRAY COM OS DETALHES DO PRODUTO
     ***************/

      //LOADING
    let loading = this.LoadingController.create({
      spinner: 'crescent',
      content: 'Carregando Produto'
    });
    loading.present().then(() => {
      this.HttpService.JSON_GET(`/produtos/${this.strIdProduto}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
        .then(
          (res) => {
            console.log(res.json());
            this.arDetalhesProduto = res.json();
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
   FAZ O USUÁRIO VOLTAR PARA A LISTAGEM DE PRODUTOS DA CATEGORIA
   SE CLICAR NO ICONE FECHAR
   ***************/
  voltar() {
    this.navCtrl.push(ProdutosPage, {}, {animate: true, direction: 'back'});
  }

  soma(qtd) {
    this.qtdProduto += 1;
    console.log(this.qtdProduto);
    return this.qtdProduto;
  }

  subtrai(qtd) {
    this.qtdProduto -= 1;
    if (this.qtdProduto <= 0)
      this.qtdProduto = 1;
    console.log(this.qtdProduto);
    return this.qtdProduto;
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

  /***************
   ADICIONAR CARRINHO
   ***************/
  addItemCarrinho(item, form){
    console.log(form.value.qtdProduto);
    let alert = this.AlertController.create({
      title: 'Adicionar a sacola',
      message: `O item ${item.name} será adicionado a sacola`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: (res) => {
            this.CarrinhoProvider.addCart(item, form.value.qtdProduto)
          }
        }
      ]
    });
    alert.present();
    console.log(this.CarrinhoProvider.itensCart);
  }
  
}
