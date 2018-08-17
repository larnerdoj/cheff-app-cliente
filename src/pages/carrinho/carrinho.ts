import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../providers/storage";
import {GlobalsService} from "../../providers/globals";
import {HttpService} from "../../providers/http";
import {CarrinhoProvider} from "../../providers/carrinho";

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

  verCarrinho(item) {
    this.navCtrl.push(CarrinhoPage);
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
    console.log(this.CarrinhoProvider.itensCart);
  }

  soma(ItemQTD) {
    console.log(ItemQTD);
    this.qtdProduto = ItemQTD;
    this.qtdProduto += 1;
    console.log(this.qtdProduto);
    return this.qtdProduto;
  }
  //
  // subtrai(item) {
  //   this.qtdProduto -= 1;
  //   if (this.qtdProduto <= 0)
  //     this.qtdProduto = 1;
  //   console.log(this.qtdProduto);
  //   return this.qtdProduto;
  // }

}
