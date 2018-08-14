import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutosPage} from "../produtos/produtos";
import {GlobalsService} from "../../providers/globals";
import {StorageService} from "../../providers/storage";
import {LoginPage} from "../login/login";
import {ErrorTokenPage} from "../error-token/error-token";
import {HttpService} from "../../providers/http";

/**
 * Generated class for the CardapioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  public strToken;
  strNomeCliente: string;
  strNumberToken: string;
  arListaCategorias: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StorageService: StorageService,
    private GlobalsService: GlobalsService,
    private HttpService: HttpService)
  {
  }

  ionViewDidLoad() {
    this.strToken = this.navParams.get("paramStrToken");
    console.log(this.strToken);
    this.HttpService.JSON_GET(`/comandas/mobile/login/token/${this.strToken}/${this.GlobalsService.strEmpresa}`, false, true, 'json')
      .then(
        (res) =>{
          console.log(res.json());
          this.strNomeCliente = res.json().name;
          this.strNumberToken = res.json().code;
        },
        (error) =>{
          console.log(error);
        }
      )

    this.HttpService.JSON_GET(`/categorias/${this.GlobalsService.strEmpresa}`, false, true, 'json')
      .then(
        (res) => {
          //console.log(res.json());
          this.arListaCategorias = res.json();
        }
      ),
      (error) => {
        console.log(error);
      }
  }

  detalheCategoria(idCategoria) {
    this.navCtrl.push(ProdutosPage, { id: idCategoria.id, categoria: idCategoria.categoria });
  }

  // verDetalhes(filme) {
  //   this.navCtrl.push(DetailsCartePage, { id: filme.id, name: filme.name });
  // }

}
