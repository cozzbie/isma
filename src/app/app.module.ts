import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { 
  Http, HttpModule, JsonpModule, 
  RequestOptions,
  XHRBackend } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Isma } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { ContactsPage } from '../pages/contacts/contacts';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';

//Shared Components

//Providers
import { Auth } from '../providers/auth';
import { AuthInterceptor } from '../providers/auth-interceptor';
import { AuthFactory } from '../providers/auth-factory';
//import { CustomRequestOptions } from '../providers/custom-request-options';

@NgModule({
  declarations: [
    Isma,
    HomePage,
    ContactsPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(Isma, {
      backButtonIcon: "ios-arrow-round-back",
      tabsPlacement: 'bottom'
    }),
    JsonpModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Isma,
    HomePage,
    ContactsPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    AboutPage
  ],
  providers: [
    Storage,
    AuthInterceptor,
    Auth,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions],
      useFactory: AuthFactory
    },
    //{provide: RequestOptions, useClass: CustomRequestOptions},
    //{provide: ConnectionBackend, useClass: AuthInterceptor},
  ]
})

export class AppModule {}
