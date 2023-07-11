import { Injectable } from '@angular/core';

import { env } from '../../../environments/environment';
import { PortalSessionService } from './session.service';
import { MessagingService } from '../messaging.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from "rxjs/operators";
import { AuthService } from '../auth.service';
import { SpinnerService } from '../spinner.service';

@Injectable()
export class PortalHttpHeaderInterceptor implements HttpInterceptor {

  private unableToConnectServerMessage = '';
  private activeCalls=0;

  constructor(private sessionService: PortalSessionService,
              private messagingService : MessagingService,
              private authService: AuthService,
              private spinnerService : SpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headerConfig: any={
      'api_auth_key': env.api_auth_key
    }
    if (this.sessionService.accessToken) {
      headerConfig['Authorization'] = 'Bearer ' + this.sessionService.accessToken;
    }
    const headerReq = request.clone({ setHeaders: headerConfig });

    this.messagingService.broadcastGlobalClearErrorEvent();
    
    if (this.activeCalls === 0) {
        this.spinnerService.setHttpProgressStatus(true);
    }
    this.activeCalls++;

    return next.handle(headerReq)
    .pipe(
          map(res => {
            return res
          }),
          catchError((error: HttpErrorResponse) => {
              let errorMsg = '';
              if (error.error instanceof ErrorEvent) {
                  console.log('This is client side error ', error);
                  errorMsg = `Error: ${error.error.message}`;
              } else {
                  console.log('This is server side error');
                  errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                  if (error.status === 401) {
                    console.log('http.interceptor.service - received 401, checking local session expiry. rejection: ', error);
                    const session = this.sessionService;
                    if (session.isExpired()) {
                        console.log('http.interceptor.service - local session is expired, logging user out.');
                        //unauthorized, redirect to login
                        const AuthService = this.authService
                        AuthService.portalLogout();
                    }
                  }
                  else {
                      //generic error handling logic goes here
                      this.broadcastFriendlyErrorMessage(error);
                  }
              }
              return throwError(() => errorMsg);
          })
    )
    .pipe(finalize(()=>{
        this.activeCalls--;
        if (this.activeCalls === 0) {
        this.spinnerService.setHttpProgressStatus(false);
        }
    }))
  }

  private broadcastFriendlyErrorMessage(rejection : HttpErrorResponse) {
    /*jshint maxcomplexity:false */
    let msg = '';
    //the case where the client cannot connect to the server
    if (!rejection.error && rejection.status === 0 && rejection.statusText === '') {
        this.messagingService.broadcastGlobalErrorEvent({ errorMessage: this.unableToConnectServerMessage });
    }
    else if (rejection.status === 400) {
        //the case where we push a custom error description down the wire
        if (rejection.error && rejection.error.error_description) {// jshint ignore:line
            msg = rejection.error.error_description;// jshint ignore:line
        }
            //the case where asp.net modelstate errors come down the wire
        else if (rejection.error && rejection.error.message === 'The request is invalid.' &&
            rejection.error.modelState) {
            const errors : string[]= [];
            Object.keys(rejection.error.modelState).forEach((key) => {
                for (let i = 0; i < rejection.error.modelState[key].length; i++) {
                    errors.push(rejection.error.modelState[key][i]);
                }
            })
            msg = errors.join('<br/>');
        }
        else if (rejection.error && rejection.error.message) {
            msg = rejection.error.message;
        }
        else if (rejection.error) {
            msg = rejection.error;
        }
        this.messagingService.broadcastGlobalWarningEvent({ message: msg });
    }
    else if (rejection.status === 404) {
        if (rejection.error && rejection.error.message) {
          this.messagingService.broadcastGlobalErrorEvent({ errorMessage: '(404): ' + rejection.error.message });
        }
    }
    else if (rejection.status === 500) {
        if (rejection.error) {
            let ex = rejection.error;
            while (ex.innerException) {
                ex = ex.innerException;
            }
            const url = rejection.url ? rejection.url : '';
            if(!url.toLowerCase().includes("upload")) {
              this.messagingService.broadcastGlobalErrorEvent({ errorMessage: '(500) unexpected error: ' + ex.exceptionMessage });
            }
        }
    }
  }
}
