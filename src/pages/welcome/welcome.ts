import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { LoginPage } from  '../login/login';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  loadLoginView(): void {
    let loginModal = this.modalCtrl.create(LoginPage);
    loginModal.present();
  }

}