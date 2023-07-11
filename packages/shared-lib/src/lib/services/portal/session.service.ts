import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment'
import jwt_decode from "jwt-decode";
import { LocalStorageService } from './../local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class PortalSessionService {

  constructor(private localStorageService: LocalStorageService) {}

  localStorageSessionKey = 'SMEasy-' + env.environment + '-AuthData';
  username: string | undefined
  accessToken: string | undefined
  canImpersonate: boolean | undefined
  exp: number | undefined

  create(jwt: string, credentials?: any) {// jshint ignore:line
    const decodedToken: any = jwt_decode(jwt);// jshint ignore:line
    const canImpersonateString = decodedToken['user.canImpersonate'];
    const canImpersonate = canImpersonateString === 'True';
    const exp = decodedToken['exp'];
    this.setSessionProperties(credentials.username, jwt, canImpersonate, exp);
    this.setLocalStorageProperties(credentials.username, jwt, canImpersonate);   
  }

  setSessionProperties(username?:string, accessToken?:string, canImpersonate?:boolean, exp?:number|undefined) {
    this.username = username;
    this.accessToken = accessToken;
    this.canImpersonate = canImpersonate;
    this.exp = exp;
  }

  setLocalStorageProperties(username?:string, accessToken?:string, canImpersonate?:boolean) {
    this.localStorageService.set(this.localStorageSessionKey, {
      accessToken: accessToken,
      username: username,
      canImpersonate: canImpersonate
    });
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties();
    this.setSessionProperties();
  }

  load(){// jshint ignore:line
    const localData:any =  this.localStorageService.get(this.localStorageSessionKey);
    if (localData) {
        this.setSessionProperties(localData?.username,
                                  localData?.accessToken,
                                  localData['canImpersonate'] || false);
    }

  }

  isExpired() {
      if (this.exp === undefined) {
          return true;
      }
      const expDate = new Date(this.exp * 1000);
      const now = new Date();
      const isexpired = expDate < now;
      return isexpired;
  }

}
