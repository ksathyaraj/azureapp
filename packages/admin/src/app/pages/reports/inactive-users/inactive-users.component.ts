import { Component } from '@angular/core';
import { Column, ColumnType, api, dropDownFilter, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal }  from 'packages/shared-lib/src/lib/services/api/webportal.api';
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "admin-inactive-users",
  templateUrl: "./inactive-users.component.html",
})
export class InactiveUsersComponent {
  constructor(
    private dataService: DataService
  ){}
  ngOnInit() {
    this.getPortalCountries();  
  }
  countries:any = [];
  selectedCountries = "";
  exportButton = true;
  inactiveUsersColumns: Column[] = [
    { columnDef: 'companyLoginName', header: 'Company Login Name'},
    { columnDef: 'companyName', header: 'Company Name'},
    { columnDef: 'primaryUserName',header: 'User Name'},
    { columnDef: 'primaryContactEmail', header: 'Email'},
    { columnDef: 'primaryContactNumber', header: 'Mobile'},
    { columnDef: '', header: 'Can Login' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true, checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }},
    { columnDef: 'registeredDate', header: 'Registered Date',showDateTimeFilter:true},
    { columnDef: 'lastLoginDate', header: 'Last Login Date',showDateTimeFilter:true},
    { columnDef: 'countryImageUrl', header: 'Country',showDateFilter:true ,columnType: ColumnType.image,columnDefTitle: 'countryName'}
  ];
  api: api = {
    getWithSingleDate: webPortal.getInactiveUsersReport,
    singleDateFilter: {fromDate: '', countryIds:'' },
    getWithMultiSelectFilter : {countryIds:""},
    export:webPortal.getInactiveUsersReportCsv,
    exportParams: { fromDate: '',countryIds:'' },
  };
  getPortalCountries() {
    this.dataService.getLookupData(webPortal.getPortalcountries)
      .subscribe((result: any) => {
        this.countries = result;
        this.dropDownFilter.smOptions = this.countries;
    });
  }
  title = 'Inactive users < 30 days';
  searchUIOptions: searchUIOptions = {
    singleDateFilter:true,
    multiSelectFilter:true
  };
  dateFilter = {
    smLabel: 'From',
    smPlaceholder :'DD MMM YYYY e.g. 01 Jan 2015',
    smLabelclass :'col-md-2'
  }
  dropDownFilter: dropDownFilter = {
    smOptions: this.countries,
    smRequired: false,
    smLabel: "Country",
    smOptionDisplayField: 'countryName',
    smOptionValueField: 'id',
    smPlaceholder: "Please select one or many countries",
    smLabelClass: "col-md-2",
    smImageDisplayField:"countryImageUrl",
    selectedSearchFilterDropdown: this.selectedCountries,
  };

  resourceMessages : resourceMessages = {
    noTableDataMessage:"No Items Found."
  };

}
