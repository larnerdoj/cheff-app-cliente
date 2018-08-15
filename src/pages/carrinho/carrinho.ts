import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../providers/storage";
import {GlobalsService} from "../../providers/globals";
import {HttpService} from "../../providers/http";

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private StorageService: StorageService,
    private GlobalsService: GlobalsService,
    private HttpService: HttpService
  ) {
  }

  ionViewDidLoad() {

  }

}
