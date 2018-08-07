/**********************************************
Criado por Larner Diogo - PADRONIZADO

DESCIÇÃO:
Home tst


COMPONENTS
***********************************************/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**********************************************
SERVICES
***********************************************/

/**********************************************
PAGES
***********************************************/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController
  ) {}

}
