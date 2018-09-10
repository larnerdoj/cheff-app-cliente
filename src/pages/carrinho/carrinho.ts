import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../providers/storage";
import {GlobalsService} from "../../providers/globals";
import {HttpService} from "../../providers/http";
import {CarrinhoProvider} from "../../providers/carrinho";
import {PesquisaPage} from "../pesquisa/pesquisa";

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  public qtdProduto;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private StorageService: StorageService,
    private GlobalsService: GlobalsService,
    private HttpService: HttpService,
    public CarrinhoProvider: CarrinhoProvider,
    public AlertController: AlertController
  ) {
  }

  ionViewDidLoad() {
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
   CANCELAR ITEM DO CARRINHO
   ***************/
  cancelarItem(item) {
    console.log(item);
    let alert = this.AlertController.create({
      title: 'Excluir do carrinho',
      message: `O item ${item.descricao} será excluido do carrinho`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: () => { this.CarrinhoProvider.removeCart(item)}
        }
      ]
    });
    alert.present();
    console.log(this.CarrinhoProvider.itensCart);
  }

  /***************
   ESVAZIAR CARRINHO
   ***************/
  esvaziarCarrinho(){
    let alert = this.AlertController.create({
      title: 'Limpar Carrinho',
      message: `Deseja realmante limpar o carrinho?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.CarrinhoProvider.itensCart
          }
        },
        {
          text: 'Ok',
          handler: (res) => {
            this.CarrinhoProvider.limparCarrinho();
          }
        }
      ]
    });
    alert.present();
  }

  soma(index) {
    this.CarrinhoProvider.itensCart[index].ItemQTD++;
    this.CarrinhoProvider.calculaCarrinho();
  }

  subtrai(index) {
    (this.CarrinhoProvider.itensCart[index].ItemQTD === 1) ? this.CarrinhoProvider.itensCart[index].ItemQTD = 1 : this.CarrinhoProvider.itensCart[index].ItemQTD--;
    this.CarrinhoProvider.calculaCarrinho();
  }

  /***************
   CONFIRMA PEDIDO
   ***************/
  confirmaPedido(){
    let alert = this.AlertController.create({
      title: 'Confirmação do Pedido',
      message: `Deseja realmente realizar o pedido?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: (res) => {
            //this.CarrinhoProvider.addCartViewProduto(item, form.value.qtdProduto)
          }
        }
      ]
    });
    alert.present();
  }

  /***************
   REFAZER PEDIDO
   ***************/
  refazerPedido(item){
    let alert = this.AlertController.create({
      title: 'Refazer o Pedido',
      message: `Deseja refazer o pedido de ${item}?`,
      inputs: [
        {
          name: 'qtd',
          placeholder: 'Digite a quantidade',
          type: 'number',
          value: 'this.qtd'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Confirmar',
          handler: (res) => {
            //this.addCart(item, res.qtd)
          }
        }
      ]
    });
    alert.present();
  }

}
