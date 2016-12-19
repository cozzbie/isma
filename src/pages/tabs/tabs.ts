import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { ContactsPage } from '../contacts/contacts';
import { AboutPage } from '../about/about';

import { Auth } from '../../providers/auth';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage implements OnInit {
  homeTab: any = HomePage;
  contactsTab: any = ContactsPage;
  aboutTab: any = AboutPage;

  role:any; token:any; user:any;

  constructor(private storage: Storage, private auth: Auth) {}

  ngOnInit(){
    //this.storage.clear();
    //Call global setters to set fields...
    
    // this.storage.get("token")
    // .then(res => {
    //    return { token: res };
    // })
    // .then(rese => {
    //   this.storage.get("role")
    //   .then(role => {
        
    //   })

      //Auth.token = res;
    // });
  }
}
