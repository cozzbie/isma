import { Injectable } from "@angular/core"
import { 
  Http, Request, 
  Response, Headers, 
  RequestOptions, RequestOptionsArgs, ConnectionBackend } from '@angular/http';
import { Observable } from "rxjs/Rx"

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Settings } from "../classes/settings";
import { Auth } from "../providers/auth";

import * as _ from "lodash";

@Injectable()
export class AuthInterceptor extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
      super(backend, defaultOptions);
  }

  request(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, this.getRequestOptionArgs(url, options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.get(url, this.getRequestOptionArgs(url, options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {   
      return this.intercept(super.post(url, body, this.getRequestOptionArgs(url, options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.put(url, body, this.getRequestOptionArgs(url, options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.delete(url, this.getRequestOptionArgs(url, options)));
  }
  
  getRequestOptionArgs(url:string | Request, options?: RequestOptionsArgs) : RequestOptionsArgs {
      let turl:string;

      if (options == null) {
          options = new RequestOptions();
      }
      if (options.headers == null) {
          options.headers = new Headers();
      }

      if(typeof url === "string"){
            turl = url;
      }else{
           turl = url.url;
      }

    //   if(turl.indexOf("mobidoc") > -1 && Auth.token){
    //       options.headers.append("x-access-token", Auth.token);
    //       options.headers.append("mobirole", Auth.role);
    //   }

      return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
      return observable.catch((err, source) => {
          if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
              //this._router.navigate(['/login']);
              return Observable.empty();
          } else {
              return Observable.throw(err);
          }
      });

  }
}