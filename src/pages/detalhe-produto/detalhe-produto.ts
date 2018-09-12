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
            this.CarrinhoProvider.addCartViewProduto(item, form.value.qtdProduto)
          }
        }
      ]
    });
    alert.present();
    console.log(this.CarrinhoProvider.itensCart);
  }

  preparaPedido()  {
    let objAdd = [{
      id: this.arDetalhesProduto.id,
      codigo: this.arDetalhesProduto.code,
      descricao: this.arDetalhesProduto.name,
      categoria: this.arDetalhesProduto.categoria,
      qtd: this.qtdProduto,
      vl_unit: this.arDetalhesProduto.vl_venda,
      is_promotion: this.arDetalhesProduto.is_promotion,
      vl_promotion: this.arDetalhesProduto.vl_promotion,
      vl_rate_promotion: this.arDetalhesProduto.vl_promotion,
      print_item: `${this.arDetalhesProduto.print_item}/${this.arDetalhesProduto.print_ip}`,
      obs: null
    }];
    this.itensComanda.push(objAdd[0]);
    //console.log(this.itensComanda);
    let total = this.itensComanda[0].qtd * ((this.arDetalhesProduto.vl_promotion > 0) ? this.arDetalhesProduto.vl_promotion : this.arDetalhesProduto.vl_venda);
    this.CarrinhoProvider.enviaPedido(total, this.itensComanda);
  }
}
