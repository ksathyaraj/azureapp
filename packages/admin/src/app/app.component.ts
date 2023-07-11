import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeLoaderService } from 'packages/shared-lib/src/lib/services/theme-loader.service'
import { setTheme } from 'ngx-bootstrap/utils';
import { SpinnerService } from 'packages/shared-lib/src/lib/services/spinner.service';
import { env } from 'packages/shared-lib/src/environments/environment';
import BigNumber from "bignumber.js";

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  showMainSplashScreen=false;
  showSpinner=false;

  title = 'SMEazy.WebClient';
  url:string = this.router.url
  env : any = {}

  constructor(
              private router: Router,
              private translateService: TranslateService,
              private themeLoaderService: ThemeLoaderService,
              private spinnerService: SpinnerService,
            ) {

    this.env=env;
    setTheme('bs5');
    BigNumber.config({ DECIMAL_PLACES: 2,ROUNDING_MODE: 2 })      
    router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd)
        this.url=event.urlAfterRedirects
    })


    this.spinnerService.httpProgress().subscribe((status: boolean) => {
      setTimeout(() => {
        this.showSpinner=status;
      }, 0);
    });

    // const domain=window.location.host
    // const subDomain=domain.split('.')[0]

    // if(subDomain.includes("absa"))
    //   this.themeLoaderService.load("absa");
    // else
      this.themeLoaderService.load("app");

  }
}