import { Injectable, OnInit } from "@angular/core"
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Rx"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Settings } from "../classes/settings";
import { Storage } from '@ionic/storage';

@Injectable()
export class Auth {
    static _token:string;
    static _role:string;

    constructor(public http: Http, private storage:Storage){}

    ngOnInit():void {
        console.log("Auth token racing...");
        this.storage.get("token")
        .then(res => Auth.token = res)
    }

    static set token(tk:string) {
        this._token = tk;
    }

    static get token():string {
        return this._token;
    }

    static set role(rl:string) {
        this._role = rl;
    }

    static get role():string {
        return this._role;
    }

    missedCall(phone: string): Observable<Object> {
        return this.http.post(Settings.SERVER_HOME + "missedCallCheckMobi", {phone: phone})
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    verifyPhoneNumber(id: string, pin: string): Observable<Object> {        
        return this.http.post(Settings.SERVER_HOME + "verifyCallCheckMobi", {id: id, pin: pin})
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    checkEmail(obj: Object): Observable<Object> {
        return this.http.post(Settings.SERVER_HOME + "api/signin", obj)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    checkPassword(obj: Object): Observable<Object> {
        return this.http.post(Settings.SERVER_HOME + "api/login", obj)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}