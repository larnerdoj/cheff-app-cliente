import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DetalheProdutoPage} from "../detalhe-produto/detalhe-produto";
import {HttpService} from "../../providers/http";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {CarrinhoProvider} from "../../providers/carrinho";
import {CarrinhoPage} from "../carrinho/carrinho";

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
    public AlertController: AlertController
  ) {
  }

  ionViewDidLoad() {
    // CAPTURA O ID E NOME DA CATEGORIA RECEBIDOS DA PAGINA CARDÁPIO
    this.categoriaId = this.navParams.get("id");
    this.categoriaNome = this.navParams.get("categoria");
    //console.log(this.categoriaNome);
    /***************
     GERA O ARRAY COM TODOS OS PRODUTOS DA CATEGORIA
     ***************/
    this.HttpService.JSON_GET(`/produtos/${this.GlobalsService.strEmpresa}/comanda/${this.categoriaId}`, false, true, 'json')
    .then(
        (res) => {
          //console.log(res.json());
          this.arListaProdutos = res.json();
        }
      ),
      (error) => {
        console.log(error);
      }
  }

  /***************
   CAPTURA O ID E NOME DO PRODUTO E ENVIA O USUÁRIO PARA A
   PÁGINA DE DETALHES DO PRODUTO
   ***************/
  detalheProduto(produto) {
    this.navCtrl.push(DetalheProdutoPage, { id: produto.id, categoria: produto.categoria });
  }

  /***************
   ADICIONAR CARRINHO
   ***************/
  addItemCarrinho(item){
    console.log(item);
    let alert = this.AlertController.create({
      title: 'Adicionar a sacola',
      message: `O item ${item.descricao} será adicionado a sacola`,
      inputs: [
        {
          name: 'qtd',
          placeholder: 'Digite a quantidade',
          type: 'number',
          value: this.qtd
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: (res) => {
            this.CarrinhoProvider.addCart(item, res.qtd)
          }
        }
      ]
    });
    alert.present();
    console.log(this.CarrinhoProvider.itensCart);
  }

  /***************
   ENVIA O USUÁRIO PARA A SACOLA
   ***************/
  verCarrinho() {
    this.navCtrl.push(CarrinhoPage);
  }

}
