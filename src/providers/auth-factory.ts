import { Http, Response, Headers, RequestOptions, XHRBackend } from '@angular/http';
import { Injectable } from "@angular/core"
import { AuthInterceptor } from '../providers/auth-interceptor';

export function AuthFactory (backend: XHRBackend, defaultOptions: RequestOptions) {
    return new AuthInterceptor(backend, defaultOptions);
}