import { Injectable } from "@angular/core"
import { BaseRequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx"

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Settings } from "../classes/settings";
import { Auth } from "../providers/auth";

@Injectable()
export class CustomRequestOptions extends BaseRequestOptions {
  constructor() {
        super();
        this.headers.append('x-access-token', Auth.token);
    }
}