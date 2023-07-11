import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, api, searchUIOptions, resourceMessages, dropDownFilter } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
@Component({
  selector: "admin-company-type-audits",
  templateUrl: "./company-type-audits.component.html",
})
export class CompanyTypeAuditsComponent implements OnInit{
  constructor(private router: Router) { }
  start = moment();
  defaultDaysSelected = 15;
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  addNewButton = false;
  title = 'Command Audits by Types';
  updateURL = '/companies/company-';
  companyAuditsColums: Column[] = [
    { columnDef: 'date', header: 'Date', showDateFilter: true },
    { columnDef: 'countSucceeded', header: 'Succeeded' },
    { columnDef: 'countFailed', header: 'Failed'},
    ];
  api: api = {
    get: ''
    // dropDownFilter: {selectedDay: '20', t: this.start.millisecond()},
  };
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    dropdown:true,
  };
  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder: "enter CommandType here..."
  };
  dropDownFilter: dropDownFilter = {
    smOptions: portalConstants.days,
    smRequired: false,
    smLabel: "Days",
    smOptionDisplayField: 'value',
    smOptionValueField: 'id',
    smPlaceholder: "select",
    smLabelClass: "col-md-3",
    selectedSearchFilterDropdown: this.defaultDaysSelected
  };
  isLoading = false;

  ngOnInit(){
    this.api.get = webPortal.commandAuditTypes+'/'+this.defaultDaysSelected+'/'+undefined;
    this.isLoading = true;
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + param.id);
  }
  smHandleDropdownClick(event:any) {
    const updateParams = JSON.parse(JSON.stringify(this.api));
    updateParams.get = webPortal.commandAuditTypes+'/'+event+'/'+undefined;
    this.api = updateParams;
  }
}
