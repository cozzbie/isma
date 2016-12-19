import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Auth } from "../../providers/auth";
import { TabsPage } from '../tabs/tabs';

import { Contact } from 'ionic-native';

declare var cordova:any;
declare var window:any;
declare var PhoneCallTrap:any;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Auth]
})
export class LoginPage implements OnInit {

  loginData = {};
  loginView:any = {email: true};
  transacting:boolean = false;
  viewMessage:string = "Welcome. Enter your email to begin.";
  cpwView:boolean = false;
  missedCallId:string;
  loginViewState:number = 0;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public storage: Storage,
    public auth: Auth,
    platform:Platform
    ) {
      platform.ready().then(() => {
        this.setRingListener();
      })
    }

  makeCall():void {
    this.loginViewState = 1;
    this.auth.missedCall((<any>this.loginData).phone).subscribe(res => {
      //console.log(res);

      if((<any>res).code){
        console.log("Wahala dey"); 
        return false;
      }

      this.missedCallId = (<any>res).id;
      //this.login()
    }, (err) => {
      console.log(err);
    });
  }

  verifyPhone():void {
    this.auth.verifyPhoneNumber(this.missedCallId, (<any>this.loginData).pin).subscribe(res => {
      //console.log(res);

      if((<any>res).code){
        console.log("Wahala dey also");
        return false;
      }

      if((<any>res).validated){
        //console.log((<any>res).number);
        
        this.login();
      }
    });
  }
  
  loginModalDismiss():void {
    if(this.loginViewState == 1){
      this.loginViewState = 0;
    }else{
      this.viewCtrl.dismiss();
      this.cpwView = false;
    }
    
  }

  login():void {
    this.navCtrl.setRoot(TabsPage);
  }

  changePassword():void {
    
  }

  transactionOngoing():void {
    this.transacting = true;
    this.viewMessage = "Please wait...";
  }

  transactionDone():void {
    this.transacting = false;
  }

  setRingListener():void {
    PhoneCallTrap.onCall(obj => {
          //console.log("CHANGE STATE: " + obj);

          var call = JSON.parse(obj);

          switch (call.state) {
              case "RINGING":
                  //console.log("Phone is ringing");
                  (<any>this.loginData).pin = call.incomingNumber.substr(-4);
                  this.verifyPhone();
                  break;
              case "OFFHOOK":
                  //console.log("Phone is off-hook");
                  break;
              case "IDLE":
                  //console.log("Phone is idle");
                  break;
          }
      });
  }

  ngOnInit():void {
    
  }

}