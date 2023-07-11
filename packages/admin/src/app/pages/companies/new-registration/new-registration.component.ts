import { Component } from "@angular/core";
import { Column, api, ColumnType, searchUIOptions, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { Router } from '@angular/router';
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";

@Component({
  selector: "admin-new-registration",
  templateUrl: "./new-registration.component.html",
})
export class NewRegistrationComponent {

  constructor(private router: Router){}

  updateURL = '/companies/company-'

  title = "New Registrations"
  newRegistrationColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login', columnType: ColumnType.link,hideSorting: true },
    { columnDef: 'primaryUserName', header: 'Username' ,hideSorting: true},
    { columnDef: 'registeredDate', header: 'Registered',showDateTimeFilter:true,hideSorting: true},
    { columnDef: 'primaryContactEmail', header: 'Email / Mobile', columnDef2: 'primaryContactNumber',hideSorting: true },
    { columnDef: '', header: 'Is Registration Complete' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,hideSorting: true,
    checkboxClassField: (dataValue: any) => { return dataValue['isRegistrationComplete'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }
    },
    { columnDef: '', header: 'Can Login' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,hideSorting: true,
      checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }
    },
    { columnDef: 'paymentType', header: 'Payment Type',hideSorting: true },
    { columnDef: 'paymentFrequency', header: 'Payment Frequency',hideSorting: true },
    { columnDef: 'source', header: 'Source',hideSorting: true },
    { columnDef: 'countryImageUrl', header: 'Country', columnType: ColumnType.image,columnDefTitle: 'countryName',hideSorting: true}
  ]

  api: api = {
    getWithDateRange: webPortal.newRegistrations
  };

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    dateRange: true
  };

  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder: "search company, country, email, type, frequency, reseller and campaign..."
  };

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.id);
  }
}
