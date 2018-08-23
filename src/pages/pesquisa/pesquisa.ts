import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {CarrinhoProvider} from "../../providers/carrinho";
import {HttpService} from "../../providers/http";
import {CarrinhoPage} from "../carrinho/carrinho";
import {DetalheProdutoPage} from "../detalhe-produto/detalhe-produto";

/**
 * Generated class for the PesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {

  itens: any;
  itensFull: any;
  exibeProdutosFiltrados: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private GlobalsService: GlobalsService,
    private StorageService: StorageService,
    private HttpService: HttpService,
    private CarrinhoProvider: CarrinhoProvider
  ) {
  }

  ionViewDidLoad() {
    /****
     PESQUISA NA API E RETORNA OS PRODUTOS
     *****/
    this.HttpService.JSON_GET(`/produtos/${this.GlobalsService.strEmpresa}/comanda`, false, true, 'json')
      .then(
        (res) => {
          console.log(res.json());
          this.itens = res.json();
          this.itensFull = res.json();
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

  /****
  FILTRA PRODUTOS
  *****/
  filtraProdutos(event) {

    let val = event.target.value.toLowerCase();

    if (val.length === 0) {//se nao estiver nada digitado, nao exibe pesquisa
      this.itens = this.itensFull;//carrega a copia original dos produtos
      this.exibeProdutosFiltrados = false;//exibe mensagem para usuario digitar o que deseja

    } else {

      if (this.itensFull === undefined || this.itensFull.length === 0) {//se nao existir registros
        alert('Não existem produtos cadastrados!');
        return false

      } else {//se nao inicia filtro
        let filtro = this.itensFull.filter(function (o) {
          return Object.keys(o).some(function (k) {
            if(o[k] === null){}
            else{
              return o[k].toString().toLowerCase().indexOf(val) != -1 || !val;
            }
          })
        })

        this.itens = filtro;
        this.exibeProdutosFiltrados = true;
      }

    }

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
