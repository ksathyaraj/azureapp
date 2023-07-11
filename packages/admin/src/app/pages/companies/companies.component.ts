import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";


@Component({
  selector: "admin-companies",
  templateUrl: "./companies.component.html",
})
export class CompaniesComponent {
  navButtonList: navButtonGrid[] = [
    {
      text: 'NEW REGISTRATIONS',
      sref: '/companies/newregistrations'
    },
    {
      text: 'RESELLER REGISTRATIONS',
      sref: '/companies/resellerregistrations'
    },
    {
      text: 'CAMPAIGN REGISTRATIONS',
      sref: '/companies/campaignregistrations'
    },
    {
      text: 'FREE TRIAL REGISTRATIONS',
      sref: '/companies/freeregistrations'
    },
    {
      text: 'SEARCH ALL COMPANIES',
      sref: '/companies/searchallcompanies'
    },
    {
      text: 'HANDOVER COMPANIES',
      sref: '/companies/handovers'
    },
    {
      text: 'ABSA COMPANIES',
      sref: '/companies/absaregistrations',

    },
    {
      text: 'ALL ABSA COMPANIES',
      sref: '/companies/allabsaregistrations'
    }
  ]
}