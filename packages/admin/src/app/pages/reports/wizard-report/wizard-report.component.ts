import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, ColumnType, api, searchUIOptions, resourceMessages, dropDownFilter } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";

@Component({
  selector: "admin-wizard-report",
  templateUrl: "./wizard-report.component.html",
})
export class WizardReportComponent {
  constructor(private router: Router) { }
  start = moment();
  exportButton = true;
  pdfButton = false;
  addNewButton = false;
  title = 'Wizard Report';
  updateURL = '/companies/company';
  countryId = "1";

  resellerColumns: Column[] = [
    { columnDef: 'companyName', header: 'Registered Company',columnType: ColumnType.link},
    { columnDef: 'companyLoginName', header: 'Company Login Name'},
    { columnDef: 'registeredDate', header: 'Registered Date',showDateTimeFilter:true },
  ];

  api: api = {
    getWithSingleDate: webPortal.wizardreport,
    singleDateFilter: { fromDate: '',countryId:'', },
    export: webPortal.exportWizardReport,
    exportParams: { fromDate: '' ,countryId:''},
    dropDownFilter: {countryId: '', t: this.start.millisecond()}
  };
   searchUIOptions: searchUIOptions = {
     searchInput: true,
     singleDateFilter: true,
     dropdown: true
   };
  
  resourceMessages: resourceMessages = {
    tableSearchPlaceHolder:"search registered company ..."
  };
  dateFilter = {
      smLabel: 'From',
      smPlaceholder :'DD/MM/YY e.g.24/05/2023',
      smLabelclass :'col-sm-3'
  }
  dropDownFilter: dropDownFilter = {
    smOptions: portalConstants.wizardReportCountries,
    smRequired: false,
    smLabel: "",
    smOptionDisplayField: 'key',
    smOptionValueField: 'value',
    smPlaceholder: "",
    smLabelClass: "col-md-2",
    selectedSearchFilterDropdown: this.countryId,
  };

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'-'+param.id);
  }
  
}