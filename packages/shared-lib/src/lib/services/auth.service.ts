import { Injectable } from '@angular/core';

import * as moment from 'moment/moment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { PortalSessionService } from './portal/session.service';
import { DataService } from './data.service';
import { LookupDataService } from './lookup-data.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http: HttpClient,
              private sessionService: SessionService,
              private portalSessionService: PortalSessionService,
              private dataService: DataService,
              private lookupDataService: LookupDataService,
              private navigationService: NavigationService
             ) { }

  login(payload: any, route: string, credentials?: any, isAdminServiceCall?: boolean) {
      const start = moment();// jshint ignore:line
      return this.http
          .post<httpResponse>(route,
                  payload,
                  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .pipe(map((res: any) =>{
              const end = moment();// jshint ignore:line
              if(isAdminServiceCall) {
                this.portalSessionService.create(res.access_token, credentials);// jshint ignore:line
              } else {
              this.sessionService.create(res.access_token);// jshint ignore:line
              }
              console.log(route + ' took: ' + Math.round(end.valueOf()-start.valueOf()) + ' milliseconds, from: ' + start.format('h:mm:ss.SSS') + ' to: ' + end.format('h:mm:ss.SSS'));
              return res;
          }));
  }

  refreshToken() {
      return this.dataService.post('/api/auth/refreshtoken').subscribe((res: any) => {
          this.sessionService.create(res);// jshint ignore:line
      });
  }

  mtnSsoLogin(jwt: any) {
    this.sessionService.create(jwt);
  }

  logOutWithoutRedirect() {
    this.sessionService.destroy();
    this.lookupDataService.clearCache();
  }

  logOut() {
      const isMtnUserWithSpecifiedLogoutUrl = this.sessionService.isProvisioned && this.sessionService.mtnLogoutUrl;
      const mtnLogoutUrl = this.sessionService.mtnLogoutUrl;

      this.logOutWithoutRedirect();

      if (isMtnUserWithSpecifiedLogoutUrl && mtnLogoutUrl)  {
        this.navigationService.goToUrl(mtnLogoutUrl);
      } else {
        this.navigationService.goToLogin();
      }
  }

  portalLogout() {
    this.portalSessionService.destroy();
    this.navigationService.goToLogin();
    this.lookupDataService.clearCache();
  }

  isAuthenticated() {
      return !!this.sessionService.companyname && !!this.sessionService.username && !!this.sessionService.accessToken;
  }

  isPortalAuthenticated() {
    return !!this.portalSessionService.username && !!this.portalSessionService.canImpersonate && !!this.portalSessionService.accessToken;
  }

  canImpersonate() {
    return this.portalSessionService.canImpersonate;
  }

  hasRequiredPermission(permission: string) {
    if(this.sessionService.userPermissionSet)
    {
      const permissions: string[] = this.sessionService.userPermissionSet.split(',');
      for (let i = 0; i < permissions.length; i++) {
          if (permissions[i] == permission)
              return true;
      }
    }

      return false;
  }
}

interface httpResponse {
  data: object
}
