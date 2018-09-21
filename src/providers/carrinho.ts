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
import {GlobalsService} from "./globals";
import {DatePipe} from "@angular/common";
import {CardapioPage} from "../pages/cardapio/cardapio";

@Injectable()
export class CarrinhoProvider {

  //SETA EXIBICAO DE CARRINHO DE COMPRAS
  itensCart: any = [];
  totalCart: number = 0;
  taxaEntrega: number = 0;
  private qtd: string;
  obs: string;

  constructor(
    public AlertController: AlertController,
    public LoadingController: LoadingController,
    public DatePipe: DatePipe,
    private HttpService: HttpService,
    private StorageService: StorageService,
    private GlobalsService: GlobalsService
  ) {}

  /***************
   ADICIONA ITEM DO CARRINHO
   ***************/
  addCart(item, qtd:number){

    this.itensCart.push({
      id: item.id,
      codigo: (item.code) ? item.code : item.codigo,
      descricao: (item.name) ? item.name : item.descricao,
      categoria: item.categoria,
      qtd: qtd,
      vl_unit: (item.vl_venda) ? item.vl_venda : item.valor,
      is_promotion: item.is_promotion,
      vl_promotion: item.vl_promotion,
      vl_rate_promotion: item.vl_promotion,
      print_item: `${item.print_item}/${item.print_ip}`,
      photo: item.photo,
      obs: item.obs
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
   ADICIONA ITEM DO CARRINHO
   ***************/
  addItemRefazer(item, qtd:number){

    this.itensCart.push({
      id: item.id,
      codigo: item.prod_code,
      descricao: item.prod_desc,
      categoria: item.prod_cat,
      qtd: qtd,
      vl_unit: (item.vl_venda) ? item.vl_venda : item.valor,
      is_promotion: item.is_promotion,
      vl_promotion: item.vl_promotion,
      vl_rate_promotion: item.vl_promotion,
      print_item: `${item.print_item}/${item.print_ip}`,
      photo: item.photo,
      obs: item.obs
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
    return this.itensCart.forEach(s => this.totalCart += (s.vl_unit * s.qtd));
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
        id: item.id,
        codigo: (item.code) ? item.code : item.codigo,
        descricao: (item.name) ? item.name : item.descricao,
        categoria: item.categoria,
        qtd: qtd,
        vl_unit: (item.vl_venda) ? item.vl_venda : item.valor,
        is_promotion: item.is_promotion,
        vl_promotion: item.vl_promotion,
        vl_rate_promotion: item.vl_promotion,
        print_item: `${item.print_item}/${item.print_ip}`,
        photo: item.photo,
        obs: item.obs
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
          type: 'tel',
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

            let alert = this.AlertController.create({
              title: 'Observações',
              message: `Deseja enviar alguma observação para o item ${item.descricao}?`,
              inputs: [
                {
                  name: 'obs',
                  placeholder: 'Digite a observação',
                  type: 'text',
                  value: this.obs
                },
              ],
              buttons: [
                {
                  text: 'Nenhuma Observação',
                  handler: () => {
                    this.addCart(item, res.qtd);
                  }
                },
                {
                  text: 'Enviar',
                  handler: (resObs) => {
                    item.obs = resObs.obs;
                    console.log(resObs.obs);
                    console.log(item.obs);
                    this.addCart(item, res.qtd);
                  }
                }
              ]
            });
            alert.present();
          }
        }
      ]
    });
    alert.present();
    console.log(this.itensCart);
  }

  /***************
   REFAZER PEDIDO CARRINHO
   ***************/
  refazerPedido(item){
    // console.log(item);
    let alert = this.AlertController.create({
      title: 'Adicionar a sacola',
      message: `O item ${item.prod_desc} será adicionado a sacola`,
      inputs: [
        {
          name: 'qtd',
          placeholder: 'Digite a quantidade',
          type: 'tel',
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

            let alert = this.AlertController.create({
              title: 'Observações',
              message: `Deseja enviar alguma observação para o item ${item.prod_desc}?`,
              inputs: [
                {
                  name: 'obs',
                  placeholder: 'Digite a observação',
                  type: 'text',
                  value: this.obs
                },
              ],
              buttons: [
                {
                  text: 'Nenhuma Observação',
                  handler: () => {
                    this.enviaPedido(item, res.qtd);
                  }
                },
                {
                  text: 'Enviar',
                  handler: (resObs) => {
                    item.obs = resObs.obs;
                    console.log(resObs.obs);
                    console.log(item.obs);
                    this.enviaPedido(item, res.qtd);
                  }
                }
              ]
            });
            alert.present();
          }
        }
      ]
    });
    alert.present();
    // console.log(this.itensCart);
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
                this.HttpService.JSON_POST(`/comandas/${this.StorageService.getItem('idComanda')}/itens/${this.StorageService.getItem('userId')}`, objPost, false, true, 'json')
                  .then(
                    (res)=> {
                      console.log(res.json());
                      this.enviaImpressao(total, itens);
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

  enviaImpressao(total, itens) {
    let i;
    let countItens = 0;
    for(i=0;i<itens.length;i++){

      //VERIFICANDO SALDO DO CLIENTE
      let saldoCliente;
      if(Number(this.StorageService.getItem('credit')) - total <= 0){
        saldoCliente = 0;
      }else{
        saldoCliente = Number((Number(this.StorageService.getItem('credit')) - total).toFixed(2));
      }

      let print_item;//IMPRESSORA DO ITEM
      print_item = itens[i].print_item;

      let itemImpressao = {};
      itemImpressao['CONFIG'] = {};
      itemImpressao['CONFIG']['qtd_vias'] = 2;

      itemImpressao['Header'] = this.StorageService.getItem('nomeComanda');

      itemImpressao['Content'] = {};
      itemImpressao['Content'][0] = `MESA ${this.StorageService.getItem('mesa')} / ${this.StorageService.getItem('nomeComanda')}`;
      itemImpressao['Content'][3] = itens[i].categoria;
      itemImpressao['Content'][1] = `(${itens[i].qtd}x) - ${itens[i].descricao}`;
      itemImpressao['Content'][2] = itens[i].obs;

      let vlTotal;
      if(itens[i].is_promotion === 1){
        vlTotal = itens[i].qtd * itens[i].vl_promotion;
      }else{
        vlTotal = itens[i].qtd * itens[i].vl_unit;
      }

      itemImpressao['Footer'] = {};
      itemImpressao['Footer'][0] = this.GlobalsService.getCurrency((vlTotal).toFixed(2));
      itemImpressao['Footer'][1] = this.GlobalsService.getCurrency(saldoCliente);
      itemImpressao['Footer'][2] = this.StorageService.getItem('atendente');
      itemImpressao['Footer'][3] = this.DatePipe.transform(Date.now(), 'dd/MM/yyyy, H:mm');

      countItens++;

      this.HttpService.JSON_POST(`/impressao/item-comanda/${print_item}`, itemImpressao, false, true, 'json')
        .then(
          (res) => {

          },
          (error) => {
            this.AlertController.create({
              title: 'Erro',
              message: error._body
            }).present();
          })

      if(countItens===itens.length){
        //this.NavController.setRoot(CardapioPage, {}, { animate: true, direction: 'back' });
        this.AlertController.create({
          title: 'Enviado',
          message: 'Seu pedido foi enviado para o preparo!'
        }).present();
        this.itensCart = [];
        this.calculaCarrinho();
      }

    }
  }
}
