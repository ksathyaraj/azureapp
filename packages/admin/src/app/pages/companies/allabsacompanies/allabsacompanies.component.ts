import { Component } from "@angular/core";
import { searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "admin-allabsacompanies",
  templateUrl: "./allabsacompanies.component.html",
})
export class AllabsacompaniesComponent {
  constructor(
    private dataService: DataService,
    private dateService: DateService,
    private notificationBarService: NotificationBarService
  ) { }
  isStartDateValid = false;
  isEndDateValid = false;
  fromDate: any = null;
  toDate: any = null;
  dateFormat = "DD/MM/YYYY";
  requests: any = [];
  from: any = null;
  to: any = null;

  title = 'All Absa Registrations';

  searchUIOptions: searchUIOptions = {
    dateRange: true,
  };

  request() {
    this.isStartDateValid = true;
    this.isEndDateValid = true;

    if (this.fromDate !== null) {
      if (!this.dateService.isValidDate(this.fromDate, this.dateFormat)) {
        this.isStartDateValid = false;
        return;
      }
    }

    if (this.toDate !== null) {
      if (!this.dateService.isValidDate(this.toDate, this.dateFormat)) {
        this.isEndDateValid = false;
        return;
      }
    }

    const from = this.dateService.getDefaultFromDate();
    const to = this.dateService.getDefaultToDate();

    const paramFilters: any = {};
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);
    paramFilters.registrationSources = '5,6'; //AbsaOnlineBanking = 5,AbsaBatchRegistration = 6
    return this.dataService.getWithParams(webPortal.allabsaRegistrations, paramFilters).subscribe((result: any) => {
      this.notificationBarService.success('Request for All ABSA Registrations Report generation submitted.');
      this.refreshRequests();

    })
  }

  getData(refresh: boolean) {
    const paramFilters: any = {};
    paramFilters.from = this.dateService.getFormattedDateForWebApi(this.from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(this.to);
    paramFilters.registrationSources = '5,6'; //AbsaOnlineBanking = 5,AbsaBatchRegistration = 6
    this.refreshRequests();
  }

  refreshRequests() {
    this.dataService
      .get(webPortal.refreshRegistrations)
      .subscribe((result) => {
        this.requests = result;
      });
  }
  downloadReport(url: string) {
    window.open(url, "_blank");
  }

  ngOnInit() {
    this.getData(true);
    this.from = this.dateService.getDefaultFromDate();
    this.to = this.dateService.getDefaultToDate();
  }

}
