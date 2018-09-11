/*--------------
V 2.0.0

DESCIÇÃO:
CarrinhoProvider


COMPONENTS
***********************************************************/
import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {HttpService} from "./http";
import {StorageService} from "./storage";

@Injectable()
export class CarrinhoProvider {

  //SETA EXIBICAO DE CARRINHO DE COMPRAS
  itensCart: any = [];
  totalCart: number = 0;
  taxaEntrega: number = 0;
  private qtd: string;

  constructor(
    public AlertController: AlertController,
    public LoadingController: LoadingController,
    private HttpService: HttpService,
    private StorageService: StorageService
  ) {}

  /***************
   ADICIONA ITEM DO CARRINHO
   ***************/
  addCart(item, qtd:number){

    this.itensCart.push(
      {
      'ItemId': item.id,
      'ItemValor': item.valor,
      'ItemQTD': qtd,
      'ItemName': item.descricao,
      //'ItemDescricao': item.ItemDescricao,
      'ItemPhoto': item.ItemPhoto
    });
    this.calculaCarrinho();

    let alert = this.AlertController.create({
      title: 'Sucesso',
      message: 'O item foi adicionado a sacola com sucesso!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  /***************
   CANCELAR ITEM DO CARRINHO
   ***************/
  removeCart(item){
    let index = this.itensCart.indexOf(item);
    if(index > -1) {
      this.itensCart.splice(index, 1);
    }
    this.calculaCarrinho();
  }

  /***************
   CALCULA VALOR DOS ITENS DO CARRINHO
   ***************/
  calculaCarrinho(){
    this.totalCart = 0;
    return this.itensCart.forEach(s => this.totalCart += (s.ItemValor * s.ItemQTD));
  }

  /***************
   LIMPA TODOS OS ITENS DO CARRINHO
   ***************/
  limparCarrinho() {
    this.itensCart = [];
    this.calculaCarrinho();
    let alert = this.AlertController.create({
      title: 'Carrinho',
      message: `Carrinho vazio!`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    });
    alert.present();
    console.log(this.itensCart);
  }

  /***************
   ADICIONA ITEM DO CARRINHO NOS DETALHES DO PRODUTO
   ***************/
  addCartViewProduto(item, qtd:number){
    this.itensCart.push(
      {
        'ItemId': item.id,
        'ItemValor': item.vl_venda,
        'ItemQTD': qtd,
        'ItemName': item.name,
        //'ItemDescricao': item.desc,
        'ItemPhoto': item.photo
      });
    this.calculaCarrinho();

    let alert = this.AlertController.create({
      title: 'Sucesso',
      message: 'O item foi adicionado a sacola com sucesso!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    });
    alert.present();
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
            this.addCart(item, res.qtd)
          }
        }
      ]
    });
    alert.present();
    console.log(this.itensCart);
  }

  /***************
  ENVIA PEDIDO
   **************/

  enviaPedido(total, itens) {
    let alert = this.AlertController.create({
        title: 'Enviar pedido?',
        message: 'Deseja enviar seu pedido para preparo?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Enviar',
            handler: () => {
              //CRIANDO OBJETO COM TOTAL
              let objPost = [{
                total: total,
                itens: itens
              }];

              //ENVIANDO PEDIDO PARA O BANCO
              let loading = this.LoadingController.create({
                spinner: 'crescent',
                content: 'Enviando Pedido'
              });
              loading.present().then(() => {
                this.HttpService.JSON_POST(`/comandas/${this.StorageService.getItem('idComanda')}/itens/${this.StorageService.getItem('idAtendente')}`, objPost, false, true, 'json')
                  .then(
                    (res)=> {
                      console.log(res.json());
                      loading.dismiss();
                    },
                    (error) => {
                      console.log(error);
                      loading.dismiss();
                    }
                  )
              });
            }
          }
        ]
      });
      alert.present();
  }

  enviaImpressao(itens) {

  }

  // let alert = this.alertCtrl.create({
  //   title: 'Enviar pedido?',
  //   message: 'Confirme seu pedido para inciar o preparo!',
  //   buttons: [
  //     {
  //       text: 'Cancelar',
  //       role: 'cancel',
  //       handler: () => {}
  //     },
  //     {
  //       text: 'Enviar',
  //       handler: () => {
  //
  //         Promise.resolve(this.calculaTotal())
  //           .then(() => {
  //
  //             //CRIANDO OBJETO COM TOTAL
  //             let objPost = [{
  //               total: this.totalPedido,
  //               itens: this.itensComanda
  //             }];
  //
  //             //EXECUTA JSON
  //             let loading = this.LoadingController.create({
  //               spinner: 'crescent',
  //               content: 'Enviando pedido'
  //             });
  //             loading.present().then(() => {
  //
  //               this.HttpService.JSON_POST(`/comandas/${this.itemCarregado.id}/itens/${this.StorageService.getItem('i')}`, objPost, false, true, 'json')
  //                 .then(
  //                   (res) => {
  //                     this.enviaImpressao();
  //                     loading.dismiss();
  //                   },
  //                   (error) => {
  //                     loading.dismiss();
  //                     this.AlertService.showAlert('ERRO', JSON.parse(error._body));
  //                   }
  //                 )
  //
  //             });
  //
  //           })
  //
  //       }
  //     }
  //   ]
  // });
  // alert.present();
}
