import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivateSessionService {

  constructor(private localStorageService: LocalStorageService) {}

  private localStorageSessionKey = 'SMEasy-' + env.environment + '-ActivationData';
  public activationData:any

  create(value:any) {// jshint ignore:line
      this.setLocalStorageProperties(value);
      this.setLocalStorageProperties(value);
  }

  destroy() {// jshint ignore:line
      this.setLocalStorageProperties(null);
      this.setSessionProperties(null);
  }

  load() {// jshint ignore:line
      const localData: any = this.localStorageService.get(this.localStorageSessionKey);
      if (localData) {
          this.setSessionProperties(localData.activationData);
      }
  }

  setSessionProperties(value: any) {// jshint ignore:line
      this.activationData = value;
  }

  setLocalStorageProperties(value: any) {// jshint ignore:line
      this.localStorageService.set(this.localStorageSessionKey, {
          activationData: value// jshint ignore:line
      });
  }

}
