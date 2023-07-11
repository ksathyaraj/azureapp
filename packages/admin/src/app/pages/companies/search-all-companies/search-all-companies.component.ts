import { Component } from "@angular/core";
import { Column, ColumnType, api, resourceMessages, dropDownFilter, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { Router } from "@angular/router";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import * as moment from "moment";

@Component({
  selector: "admin-search-all-companies",
  templateUrl: "./search-all-companies.component.html",
})
export class SearchAllCompaniesComponent {
 
  constructor(
    private router: Router,
  ){}

  start = moment();
  updateURL= '/companies/company-'
  title="Search All Company"
  selectedStatus =[{key:'', value:"All"}, {key:true, value:"True"}, {key:false, value:"False"}]

  searchUIOptions: searchUIOptions={
    searchInput: true,
    alphabetFilter: false,
    dropdown: true
  }

  resourceMessages : resourceMessages = {
    tableSearchPlaceHolder: 'search company or country ...',
    noTableDataMessage: portalConstants.noDataFound
  }

  dropDownFilter:dropDownFilter = {
    smOptions: this.selectedStatus,
    smRequired: false,
    smLabel: 'Active status',
    smOptionDisplayField: 'value',
    smOptionValueField: 'key',
    smPlaceholder: '',
    smLabelClass: 'col-md-4',
    selectedSearchFilterDropdown: '',
  }

  searchAllCompaniesColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Name', columnType: ColumnType.link, multipleInputSearchField:'sanitizedName' },
    { columnDef: 'registeredDate', header: 'Registered', showDateTimeFilter: true},
    { columnDef: 'source', header: 'Source' },
    { columnDef: '', header: 'Can Login', columnCheckbox: ColumnType.checkbox, optionalCheckboxCondition: () => { return true},
      checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, transparentBtn:true, hideSorting:true },
    { columnDef: 'countryImageUrl', header: 'Country', columnType: ColumnType.image, columnDefTitle: 'countryName', hideSorting:true, multipleInputSearchField:'countryName' }
  ]

  handleUpdateButtonClick(param: any){
    this.router.navigateByUrl(this.updateURL + param.id)
  }

  api: api = {
    get: webPortal.allCompaniesRoute,
    export: webPortal.allCompaniesCsv,
    exportParams: {
      selectedStatus: undefined
    },
    dropDownFilter: {selectedStatus: '', t: this.start.millisecond()}
  }
}
