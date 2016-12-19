import { Component, OnInit } from '@angular/core';
import { Contact, Contacts } from 'ionic-native';

import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Auth } from "../../providers/auth";

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})

export class ContactsPage {
  contacts: Contact[] = [];

  constructor(
    private platform:Platform,
    private loadingCtrl:LoadingController,
    //public navCtrl: NavController,  
    private storage: Storage) {
      
    }

  fetchAllContacts():void {
    let loading = this.loadingCtrl.create({
      content: "Loading contacts...",
      dismissOnPageChange: true
    });
    let options = {filter: "", multiple: true};

    loading.present();
    Contacts.find(["displayName", "phoneNumbers"], options)
      .then(res => {
        this.contacts = res.filter(contact => contact.displayName !== null);
        loading.dismiss();
      });
  }

  ngOnInit():void {
    
    this.platform.ready().then(() => {
        this.fetchAllContacts();
      })
  }

  //Load up threadList
  //Refresh view using .html

}
