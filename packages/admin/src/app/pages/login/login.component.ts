import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { AuthService } from "packages/shared-lib/src/lib/services/auth.service";
import { LocalStorageService } from "packages/shared-lib/src/lib/services/local-storage.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { credentials } from "packages/shared-lib/src/lib/interfaces/portal.interface";

@Component({
  selector: "admin-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private localStorageService: LocalStorageService,
    private messagingService: MessagingService,
   ) {}

  credentials = {
    username: '',
    password:''
  };

  login(credentials: credentials, loginForm: NgForm) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!loginForm.invalid) {
      const payload = 'grant_type=password&username=' + credentials.username + '&password=' + credentials.password;
      this.authService.login(payload, webPortal.token, credentials, true).subscribe(() => {
        this.navigationService.goToDashboard();
      });
    }
  }

  rememberLoginCredentials(companyLoginName: string, username: string) {
    this.localStorageService.set('login.companyLoginName', companyLoginName);
    this.localStorageService.set('login.username', username);
}
}
