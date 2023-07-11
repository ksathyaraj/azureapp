import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityDataService {
  constructor(
    private sessionService: SessionService,
    private messagingService: MessagingService
  ) { }

  //doubt
  private appendLocaleCountryCodeOnSupportUrl = false
  getCountryCode() {
    return this.appendLocaleCountryCodeOnSupportUrl ? 'en' + this.sessionService.countryCode + '/' : '/'; //We defaulting to english at the moment
  }

  broadcastCompanyProfileSavedAfterTimelapse  () { //This function is used for the onboarding page. The tasks are put onto a message que which take a few seconds to run. So we only updating Company Data 30s after.
    setTimeout( () => {
        this.messagingService.broadcastCompanyProfileSaved({ hideOverlay: true });
    }, 2000);
};
}
