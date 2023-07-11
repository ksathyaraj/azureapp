import { Injectable } from '@angular/core';
import { env } from '../../environments/environment'
import jwt_decode from "jwt-decode";
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private localStorageService: LocalStorageService) {}

  localStorageSessionKey = 'SMEasy-' + env.environment + '-AuthData';
  companyid: string | undefined
  companyname: string | undefined
  countryid: string | undefined
  countryCode: string | undefined
  username: string | undefined
  userPermissionSet: string | undefined
  accessToken: string | undefined
  isMtnUser: string | undefined
  mtnLogoutUrl: string | undefined
  isBcsgUser: string | undefined
  isProvisioned: string | undefined
  useremail: string | undefined
  userfullname: string | undefined
  exp: number | undefined

  create(jwt: string) {// jshint ignore:line
      const decodedToken: any = jwt_decode(jwt);// jshint ignore:line
        const companyid = decodedToken['company.id'];
        const countryid = decodedToken['company.countryid'];
        const countryCode = decodedToken['company.countrycode'];
        const userPermissionSet = decodedToken['user.permissions'];
        const isMtnUser = decodedToken['ismtnuser'];
        const companyname = decodedToken['company.name'];
        const username = decodedToken['user.name'];
        const mtnLogoutUrl = decodedToken['mtn.logouturl'];
        const isBcsgUser = decodedToken['isbcsguser'];
        const isProvisioned = decodedToken['isprovisioned'];
        const useremail = decodedToken['user.email'];
        const userfullname = decodedToken['user.fullname'];
        const exp = decodedToken['exp'];
        this.setProps(companyid, companyname, countryid, countryCode, username, userPermissionSet, jwt, isMtnUser, mtnLogoutUrl, isBcsgUser, isProvisioned, useremail, userfullname, exp);
    }

  destroy() {// jshint ignore:line
      this.setProps();
  }

  load(){// jshint ignore:line
      const props: any = this.localStorageService.get(this.localStorageSessionKey);
      if (props) {
          this.setSessionProperties(props);
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

  private setProps(companyid?: string, companyname?: string, countryid?: string, countryCode?: string, username?: string, userPermissionSet?: string, jwt?: string, isMtnUser?: string, mtnLogoutUrl?: string, isBcsgUser?: string, isProvisioned?: string, useremail?: string, userfullname?: string, exp?: number) {
      const props: Props = {
          companyid: companyid,
          companyname: companyname,
          countryid: countryid,
          countryCode: countryCode,
          username: username,
          userPermissionSet: userPermissionSet,
          accessToken: jwt,
          isMtnUser: isMtnUser,
          mtnLogoutUrl: mtnLogoutUrl,
          isBcsgUser: isBcsgUser,
          isProvisioned: isProvisioned,
          useremail: useremail,
          userfullname: userfullname,
          exp: exp
      };
      this.setLocalStorageProperties(props);
      this.setSessionProperties(props);
  }

  private setSentryUserData(companyId: string | undefined, companyname: string | undefined, username: string | undefined, useremail: string | undefined) {
      if (companyname && username) {
          const id = companyname + '/' + username;
          // Raven.setUserContext({ id: id, email:  useremail });
          // Raven.setExtraContext({ companyId: companyId, environment: env.environment });
      }
  }

  private setSessionProperties(props: Props) {// jshint ignore:line
      this.companyid = props.companyid;
      this.companyname = props.companyname;
      this.countryid = props.countryid;
      this.countryCode = props.countryCode;
      this.username = props.username;
      this.userPermissionSet = props.userPermissionSet;
      this.accessToken = props.accessToken;
      this.isMtnUser = props.isMtnUser;
      this.mtnLogoutUrl = props.mtnLogoutUrl;
      this.isBcsgUser = props.isBcsgUser;
      this.isProvisioned = props.isProvisioned;
      this.useremail = props.useremail;
      this.userfullname = props.userfullname;
      this.exp = props.exp;

      this.setSentryUserData(this.companyid, this.companyname, this.username, this.useremail);
  }

  private setLocalStorageProperties(props: Props) {// jshint ignore:line
    this.localStorageService.set(this.localStorageSessionKey, props);
  }
}

interface Props {
  companyid: string | undefined
  companyname: string | undefined
  countryid: string | undefined
  countryCode: string | undefined
  username: string | undefined
  userPermissionSet: string | undefined
  accessToken: string | undefined
  isMtnUser: string | undefined
  mtnLogoutUrl: string | undefined
  isBcsgUser: string | undefined
  isProvisioned: string | undefined
  useremail: string | undefined
  userfullname: string | undefined
  exp: number | undefined
}
