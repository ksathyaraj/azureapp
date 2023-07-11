import { Component } from '@angular/core';

import { AuthService } from 'packages/shared-lib/src/lib/services/auth.service'
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';
import { SessionService } from 'packages/shared-lib/src/lib/services/session.service';
import { LocalStorageService } from 'packages/shared-lib/src/lib/services/local-storage.service';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';

import { env } from 'packages/shared-lib/src//environments/environment'
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';

@Component({
  selector: 'web-login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./login.component.scss']
})
export class ForgotPasswordComponent {
    isOtpSent=false;
    isPasswordReset=false;

    constructor(
        private messagingService: MessagingService,
        private dataService: DataService,
        private authService: AuthService,
        private navigationService: NavigationService,
        private sessionService: SessionService,
        private localStorageService: LocalStorageService
    ) {}
    loginScreenMainLogoUrl = env.loginScreenMainLogoUrl;
    credentials = {
        companyloginname: '',
        username: '',
        otpChannel: '',
        otpType: 'ResetPassword',
        password:"",
        confirmPassword:"",
        otp:""
    };

    sendOtpEmail(credentials: any, form: any) {
        this.messagingService.broadcastCheckFormValidatity();
        console.log(form)
        if (form.valid) {
            credentials.otpChannel = 'Email';
            this.dataService.post(webApi.otp, credentials).subscribe(() => {
                this.isOtpSent = true;
            });
        }
    }

    sendOtpSms(credentials:any, form:any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (form.valid) {
            credentials.otpChannel = 'Sms';
            this.dataService.post(webApi.otp, credentials).subscribe(() => {
                this.isOtpSent = true;
            });
        }
    }

    resetPassword(credentials: any, form1: any, form2: any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (form1.valid && form2.valid) {
            this.dataService.post(webApi.resetpassword, credentials).subscribe( () => {
                this.isPasswordReset = true;
            });
        }
    }

}
