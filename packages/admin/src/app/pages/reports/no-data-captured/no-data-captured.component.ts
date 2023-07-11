import { Component } from '@angular/core';
import { Column, api, dropDownFilter, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal }  from 'packages/shared-lib/src/lib/services/api/webportal.api';
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "admin-no-data-captured",
  templateUrl: "./no-data-captured.component.html",
})
export class NoDataCapturedComponent {
  constructor(
    private dataService: DataService
  ){}
  ngOnInit() {
    this.getPortalCountries();  
  }
  countries:any = [];
  selectedCountries = "";
  exportButton = true;
  noDataCapturedColumns: Column[] = [
    { columnDef: 'userName', header: 'User Name'},
    { columnDef: 'userEmail', header: 'User Email'},
    { columnDef: 'userMobile',header: 'User Mobile'},
    { columnDef: 'companyLoginName', header: 'Company Login Name'},
    { columnDef: 'companyName', header: 'Company Name'},
    { columnDef: 'registeredDate', header: 'Registered Date',showDateTimeFilter:true}
  ];
  api: api = {
    getWithSingleDate: webPortal.getNoDataCapturedReport,
    singleDateFilter: {startDate: '', countryIds:'' },
    getWithMultiSelectFilter : {countryIds:""},
    export:webPortal.getNoDataCapturedReportCsv,
    exportParams: { startDate: '',countryIds:'' },
  };
  getPortalCountries() {
    this.dataService.getLookupData(webPortal.getPortalcountries)
      .subscribe((result: any) => {
        this.countries = result;
        this.dropDownFilter.smOptions = this.countries;
    });
  }
  title = 'Completed the wizard but no data captured';
  searchUIOptions: searchUIOptions = {
    singleDateFilter:true,
    multiSelectFilter:true
  };
  dateFilter = {
    smLabel: 'Starting From',
    smPlaceholder :'DD MMM YYYY e.g. 01 Jan 2015',
    smLabelclass :'col-md-3 text-start'
  }
  dropDownFilter: dropDownFilter = {
    smOptions: this.countries,
    smRequired: false,
    smLabel: "Country",
    smOptionDisplayField: 'countryName',
    smOptionValueField: 'id',
    smPlaceholder: "Please select one or many countries",
    smLabelClass: "col-md-3 text-center",
    smImageDisplayField:"countryImageUrl",
    selectedSearchFilterDropdown: this.selectedCountries,
  };

  resourceMessages : resourceMessages = {
    noTableDataMessage:"No Items Found."
  };
}
