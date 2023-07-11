import { Component } from '@angular/core';

import { AuthService } from 'packages/shared-lib/src/lib/services/auth.service'
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';
import { SessionService } from 'packages/shared-lib/src/lib/services/session.service';
import { LocalStorageService } from 'packages/shared-lib/src/lib/services/local-storage.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { env } from 'packages/shared-lib/src//environments/environment'
import { webApi } from 'packages/shared-lib/src/lib/services/api/webclient.api';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
              private authService: AuthService,
              private navigationService: NavigationService,
              private messagingService: MessagingService,
              private sessionService: SessionService,
              private localStorageService: LocalStorageService
             ) {}

  loginScreenMainLogoUrl = env.loginScreenMainLogoUrl;
  supportVideoBaseUrl = env.supportVideoBaseUrl;
  disclaimerText = env.loginDisclaimerText;
  forgotpassword = this.navigationService.goToForgotPassword;
  
  credentials = {
      companyname: '',
      username: '',
      password: ''
  };
  loginForm={

  }

  //TODO - commented portion
  login(credentials: any, form: any) {
      this.messagingService.broadcastCheckFormValidatity();
      if (!form.invalid) {
        const payload = 'grant_type=password&username=' + credentials.companyname + '|' +
                      credentials.username + '&password=' + credentials.password;
          this.authService.login(payload, webApi.token).subscribe((res: any) => {
              // DashboardButtonService.initService(true);
              this.rememberLoginCredentials(credentials.companyname, credentials.username);

              //Refresh Translations again including country specific translations, this is based on logged on user's county
              // var smeasyClientLanguage = $cookies.get('SMEasyClientLanguage');
              // TranslationService.getCountryTranslationData(smeasyClientLanguage).then(function () {
              //     $translate.refresh(smeasyClientLanguage);
              // });

              // MessagingService.broadcastLoginSuccess();
              this.navigationService.goToDashboard();
              // this.navigationService.goToForgotPassword();
          });
      }
    }
  

  activate() {
      this.getLoginCredentials();
      //force logout when loading the login page
      this.authService.logOutWithoutRedirect();
  }

  getLoginCredentials() {
      // if ($location.search().companyLoginName) {
      //     localStorageService.set('login.companyLoginName', $location.search().companyLoginName);
      //     vm.credentials.companyname = $location.search().companyLoginName;
      // } else if (localStorageService.get('login.companyLoginName')) {
      //     vm.credentials.companyname = localStorageService.get('login.companyLoginName');
      // }

      // if ($location.search().username) {
      //     localStorageService.set('login.username', $location.search().username);
      //     vm.credentials.username = $location.search().username;
      // } else if (localStorageService.get('login.username')) {
      //     vm.credentials.username = localStorageService.get('login.username');
      // }

  }

  rememberLoginCredentials(companyLoginName: string, username: string) {
      this.localStorageService.set('login.companyLoginName', companyLoginName);
      this.localStorageService.set('login.username', username);
  }
}
