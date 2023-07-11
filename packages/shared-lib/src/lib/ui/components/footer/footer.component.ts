import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { env } from "packages/shared-lib/src/environments/environment";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() isAdminSectionEnable = false;
  url="";
  version = env.version;
  environment = env.environment;
  endpoint = env.serverBaseUrl;
  showEnvDetails = env.showEnvDetails;
  hasVersionChanged = false;
  year = new Date().getFullYear();
  constructor(private router: Router) {
    router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd)
        this.url=event.urlAfterRedirects
    })
  }

  refreshApp() {
    location.reload();
  }
  

}
