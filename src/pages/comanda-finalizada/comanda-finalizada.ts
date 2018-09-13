import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsService} from "../../providers/globals";

@IonicPage()
@Component({
  selector: 'page-comanda-finalizada',
  templateUrl: 'comanda-finalizada.html',
})
export class ComandaFinalizadaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private GlobalsService: GlobalsService
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ComandaFinalizadaPage');
  }

}
