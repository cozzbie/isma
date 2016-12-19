import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HttpModule, RequestOptions, BaseRequestOptions, Headers } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import { Observable } from "rxjs/Rx"

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class Isma implements OnInit {
  rootPage;
  constructor(platform: Platform, public storage: Storage) {

    this.saveToken().subscribe(res => {
      this.runApp();
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  runApp(): void {
    // this.storage.get("token")
    //   .then(res => {
    //     this.rootPage = res ? TabsPage : WelcomePage;
    //     //Splashscreen.hide();
    //   });

    this.rootPage = false ? TabsPage : WelcomePage;
  }

  saveToken(): Observable<Promise<void>> {
    return Observable.fromPromise(this.storage.get("token"));
  }

  saveRole(): Observable<Promise<void>> {
    return Observable.fromPromise(this.storage.get("role"));
  }

  ngOnInit() {
    //init local vars here...
  }
}
