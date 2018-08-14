import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutosPage} from "../produtos/produtos";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StorageService: StorageService
  ) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetalheProdutoPage');
  }

  voltar() {
    this.navCtrl.push(ProdutosPage, {}, {animate: true, direction: 'back'});
  }

  soma() {
  }

  subtrai() {

  }

}
