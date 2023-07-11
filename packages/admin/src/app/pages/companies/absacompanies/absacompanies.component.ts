import { Component } from "@angular/core";
import { Column, api, searchUIOptions, resourceMessages, ColumnType } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { Router } from '@angular/router';
@Component({
  selector: "admin-absacompanies",
  templateUrl: "./absacompanies.component.html",
})
export class AbsacompaniesComponent {
  constructor(private dateService: DateService, private dataService: DataService, private router: Router
  ) { }
  updateURL = '/companies/company-'
  title = 'Absa Registrations';

  absaCompaniesColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login / Username', columnType: ColumnType.link, columnDef2: 'primaryUserName' },

    { columnDef: 'registeredDate', header: 'Absa Portal Sign Up \nDate & Time', showDateTimeFilter: true, columnOptionalCondition: (dataValue: any) => { return dataValue && dataValue.registrationSource == 5 ? true : false } },

    { columnDef: 'registeredDate', header: 'Absa Activation Sign Up \n Date & Time', columnOptionalCondition: (dataValue: any) => { return dataValue && dataValue.registrationSource == 6 ? true : false } },

    { columnDef: 'userCompletedRegistrationDate', header: 'Date Registration \n Completed on CFM', showDateFilter: true, colWidth: '9%' },
    { columnDef: 'registeredName', header: 'Registered \nBusiness Name' },
    { columnDef: 'ckNumber', header: 'Company Registration #' },
    { columnDef: 'primaryUserFullName', header: 'Owner Name' },
    { columnDef: 'primaryContactEmail', header: 'Email / Mobile', columnDef2: 'primaryContactNumber' },
    { columnDef: 'lastLoggedInDate', header: 'Date Last \nLogged In', showDateFilter: true },

  ];

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    dateRange: true,
  };

  resourceMessages: resourceMessages = {
    tableSearchPlaceHolder: "search company, country, email, type, frequency, reseller and campaign..."
  };

  api: api = {
    getWithDateRange: webPortal.absaCompanies,
  };

  downloadNewRegistrations() {
    const from = this.dateService.getDefaultFromDate();
    const to = this.dateService.getDefaultToDate();

    const paramFilters: any = {};
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);
    paramFilters.registrationSources = '5,6'; //AbsaOnlineBanking = 5,AbsaBatchRegistration = 6
    return this.dataService.getReportWithParams(webPortal.downloadAbsaCompanies, paramFilters).then((url: any) => {
      window.open(url, '_blank', '');
    });
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + param.id);
  }

}