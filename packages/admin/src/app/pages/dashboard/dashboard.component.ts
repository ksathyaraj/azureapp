import { Component, OnInit } from "@angular/core";
import { countryParam } from "packages/shared-lib/src/lib/interfaces/portal.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit{

  constructor(
    private dataService: DataService
   ) {}

  selectedCountries:string[] = [];
  bulkSMSCredits = 0;
  bulkSMSQuotaBalance = 0;
  bulkSMSQuotaLimit = 0;
  pendingPaymentSubscriptionCount = 0;
  countries:any = [];
  monthlyItems:any = [];
  dailyItems:any = [];
  selectedCountry:any = [];

  ngOnInit() {
    this.refresh();  
  }

  refresh() {
    this.getPendingPaymentSubscriptionCount();
    this.getPortalCountries();
    this.getSignupDetails();
    this.getBulkSMSProfile();
  }

  getPortalCountries() {
    this.dataService.getLookupData(webPortal.getPortalcountries)
      .subscribe((result) => {
        this.countries = result;
    });
  }

  getSignupDetails() {
    const paramFilters: countryParam = {};
    const selectedCountryString = this.selectedCountry.toString();
    paramFilters["countryIds"] = selectedCountryString;
    this.dataService.getRecordWithParams(webPortal.getSignupDetails,paramFilters)
    .subscribe((result:any) => {
        this.monthlyItems = result.monthlyItems;
        this.dailyItems = result.dailyItems;
     });
  }

  getPendingPaymentSubscriptionCount() {
    this.dataService.getRecord(webPortal.getPendingPaymentCount)
    .subscribe((result:any) => {
        this.pendingPaymentSubscriptionCount = result;
     });
  }

  getBulkSMSProfile() {
    this.dataService.getRecord(webPortal.getBulkSMSProfile)
    .subscribe((result:any) => {
        this.bulkSMSCredits = result.credits.balance;
        this.bulkSMSQuotaBalance = result.quota.remaining;
        this.bulkSMSQuotaLimit = result.quota.size;
     });
  }

  countryChange(country:number[]) {
    this.selectedCountry = country;
  }
}
