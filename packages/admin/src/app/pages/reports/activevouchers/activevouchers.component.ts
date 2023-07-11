import { Component } from "@angular/core";
import { Column, ColumnType, api, dropDownFilter, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal } from 'packages/shared-lib/src/lib/services/api/webportal.api';
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
@Component({
  selector: "admin-activevouchers",
  templateUrl: "./activevouchers.component.html",
})
export class ActivevouchersComponent {
  constructor(
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.getPortalCountries();
  }

  selectedCountries = "";
  countries: any = [];
  exportButton = true;

  activeVoucherColumns: Column[] = [
    { columnDef: 'licensee', header: 'Licensee' },
    { columnDef: 'voucher', header: 'Voucher' },
    { columnDef: 'companyLoginName', header: 'Company Login Name' },
    { columnDef: 'primaryUserName', header: 'User Name' },
    { columnDef: 'registeredDate', header: 'Registered', showDateTimeFilter: true },
    { columnDef: 'primaryContactEmail', header: 'Email' },
    { columnDef: 'primaryContactNumber', header: 'Mobile' },
    { columnDef: '', header: 'Can Login', columnCheckbox: ColumnType.checkbox, transparentBtn: true, checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, hideSorting: true },
    { columnDef: 'countryImageUrl', header: 'Country', showDateFilter: true, columnType: ColumnType.image, columnDefTitle: 'countryName' }
  ];

  api: api = {
    getWithSingleDate: webPortal.getActiveVoucherReport,
    singleDateFilter: { fromDate: '', countryIds: '' },
    getWithMultiSelectFilter: { countryIds: "" },
    export: webPortal.getInactiveUsersReportCsv,
    exportParams: { fromDate: '', countryIds: '' },
  }

  getPortalCountries() {
    this.dataService.getLookupData(webPortal.getPortalcountries)
      .subscribe((result: any) => {
        this.countries = result;
        this.dropDownFilter.smOptions = this.countries;
      });
  }

  title = 'Companies for Vouchers';

  searchUIOptions: searchUIOptions = {
    singleDateFilter: true,
    multiSelectFilter: true,
    searchInput: true,
  }
  dateFilter = {
    smLabel: 'Starting From',
    smPlaceholder: 'DD MMM YYYY e.g. 01 Jan 2015',
    smLabelclass: 'col-md-4'
  }

  dropDownFilter: dropDownFilter = {
    smOptions: this.countries,
    smRequired: false,
    smLabel: "",
    smOptionDisplayField: 'countryName',
    smOptionValueField: 'id',
    smPlaceholder: "Please select one or many countries",
    smLabelClass: "col-md-4",
    smImageDisplayField: "countryImageUrl",
    selectedSearchFilterDropdown: this.selectedCountries,
  }

  resourceMessages: resourceMessages = {
    tableSearchPlaceHolder: "search company login, Username or Email ...",
    noTableDataMessage: "No Items Found."
  }

}
