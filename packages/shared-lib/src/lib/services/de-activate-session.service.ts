import { Injectable } from '@angular/core';
import { env } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeActivateSessionService { 

  constructor(private localStorageService: LocalStorageService) {}
  
  private localStorageSessionKey = 'SMEasy-' + env.environment + '-DeActivationData';
  public deActivationData:any

  create(value:any) {// jshint ignore:line
      this.setLocalStorageProperties(value);
      this.setLocalStorageProperties(value);
  }

  destroy() {// jshint ignore:line
      this.setLocalStorageProperties(null);
      this.setSessionProperties(null);
  }

  load() {// jshint ignore:line
      const localData:any = this.localStorageService.get(this.localStorageSessionKey);
      if (localData) {
          this.setSessionProperties(localData.deActivationData);
      }
  }

  setSessionProperties(value:any) {// jshint ignore:line
      this.deActivationData = value;
  }

  setLocalStorageProperties(value:any) {// jshint ignore:line
      this.localStorageService.set(this.localStorageSessionKey, {
          deActivationData: value// jshint ignore:line
      });
  }
}
