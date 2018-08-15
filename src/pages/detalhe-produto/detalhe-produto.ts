import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutosPage} from "../produtos/produtos";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {HttpService} from "../../providers/http";

/**
 * Generated class for the DetalheProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-produto',
  templateUrl: 'detalhe-produto.html',
})
export class DetalheProdutoPage {

  strIdProduto: string;
  strCategoriaProduto: string;
  arDetalhesProduto: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private HttpService: HttpService,
    public StorageService: StorageService,
    private GlobalsService: GlobalsService,
  ) {

  }

  ionViewDidLoad() {
    this.strIdProduto = this.navParams.get("id");
    this.strCategoriaProduto = this.navParams.get("categoria");
    console.log(this.strIdProduto);
    this.HttpService.JSON_GET(`/produtos/${this.strIdProduto}/${this.GlobalsService.strEmpresa}`, false,true, 'json')
      .then(
        (res) => {
          console.log(res.json());
          this.arDetalhesProduto = res.json();
        }
      ),
      (error) => {
        console.log(error);
      }
  }

  voltar() {
    this.navCtrl.push(ProdutosPage, {}, {animate: true, direction: 'back'});
  }

  soma() {
  }

  subtrai() {

  }

}
