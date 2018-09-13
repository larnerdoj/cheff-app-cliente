import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalsService} from "../../providers/globals";

@IonicPage()
@Component({
  selector: 'page-error-token',
  templateUrl: 'error-token.html',
})
export class ErrorTokenPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private GlobalsService: GlobalsService
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ErrorTokenPage');
  }

}
