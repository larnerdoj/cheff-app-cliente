import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalheProdutoPage} from "../detalhe-produto/detalhe-produto";
import {HttpService} from "../../providers/http";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public categoriaId;
  public categoriaNome;
  arListaProdutos: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public HttpService: HttpService,
    public GlobalsService: GlobalsService,
    public StorageService: StorageService
  ) {
  }

  ionViewDidLoad() {
    this.categoriaId = this.navParams.get("id");
    this.categoriaNome = this.navParams.get("categoria");
    console.log(this.categoriaNome);
    this.HttpService.JSON_GET(`/produtos/${this.GlobalsService.strEmpresa}/comanda/${this.categoriaId}`, false, true, 'json')
    .then(
        (res) => {
          console.log(res.json());
          this.arListaProdutos = res.json();
        }
      ),
      (error) => {
        console.log(error);
      }

  }

  detalheProduto(produto) {
    this.navCtrl.push(DetalheProdutoPage, { id: produto.id, categoria: produto.categoria });
  }

}
