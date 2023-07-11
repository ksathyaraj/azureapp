import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, api, searchUIOptions, dropDownFilter, resourceMessages, ColumnType } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";

@Component({
  selector: "admin-free-trial-registrations",
  templateUrl: "./free-trial-registrations.component.html",
})
export class FreeTrialRegistrationsComponent {
  constructor(private router: Router) { }
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  addNewButton = false;
  title = 'Free Trial Registrations';
  updateURL = '/companies/company-';
  start = moment();
  defaultDaysSelected = 25;

  freeTrialRegistrationsColums: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login', columnType: ColumnType.link },
    { columnDef: 'primaryUserName', header: 'Username' },
    { columnDef: 'registeredDate', header: 'Registered', showDateFilter: true },
    { columnDef: 'primaryContactEmail', header: 'Email' },
    { columnDef: 'primaryContactNumber', header: 'mobile' },
    {
      columnDef: '', header: 'Can Login ', columnCheckbox: ColumnType.checkbox,
      checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, transparentBtn:true
    },
    { columnDef: 'paymentType', header: 'Payment Type' },
    { columnDef: 'paymentFrequency', header: 'Payment Frequency' },
    { columnDef: 'countryImageUrl', header: 'Country', columnType: ColumnType.image },

  ];

  api: api = {
    dropDownFilter: {selectedDay: '25', t: this.start.millisecond()},
    get: webPortal.freeRegistrations,
  };
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    dropdown:true,
  };

  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder: "search company, country, username, email, payment type and frequency..."
  };

  dropDownFilter: dropDownFilter = {
    smOptions: portalConstants.daysFreeRegistrations,
    smRequired: false,
    smLabel: "Days",
    smOptionDisplayField: 'value',
    smOptionValueField: 'id',
    smPlaceholder: "select",
    smLabelClass: "col-md-2",
    selectedSearchFilterDropdown: this.defaultDaysSelected,
  };

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + param.id);
  }
 
}
