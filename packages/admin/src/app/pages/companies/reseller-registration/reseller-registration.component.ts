import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, ColumnType, api, searchUIOptions, resourceMessages, dataOperation } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "admin-reseller-registration",
  templateUrl: "./reseller-registration.component.html",
})
export class ResellerRegistrationComponent  {
  constructor(private router: Router, private dataService : DataService){}
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  addNewButton = false;
  title = 'Reseller Registrations';
  updateURL = '/companies/company-';

  resellerColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login',columnType: ColumnType.link},
    { columnDef: 'primaryUserName', header: 'Username',},
    { columnDef: 'registeredDate', header: 'Registered',showDateTimeFilter:true, },
    { columnDef: 'primaryContactEmail', header: 'Email', },
    { columnDef: 'primaryContactNumber', header: 'Mobile' ,},
    {
      columnDef: '', header: 'Can Login ', columnCheckbox: ColumnType.checkbox, hideSorting: true,
       optionalCheckboxCondition: (dataValue: any,originalDataSet:any) => { return dataValue.canLogin || !originalDataSet.canLogin },
      checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, transparentBtn: true
    },
    { columnDef: 'paymentType', header: 'Payment Type', },
    { columnDef: 'paymentFrequency', header: 'Payment Frequency', },
    { columnDef: 'resellerName', header: 'Reseller', },
    { columnDef: 'countryImageUrl',colWidth:"1%", header: 'Country',showDateFilter:true ,columnType: ColumnType.image,columnDefTitle: 'countryName'}
  ];

  api: api = {
    get: webPortal.resellerregistrations,
  };
   searchUIOptions: searchUIOptions = {
    searchInput: true,
   };
  
  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder:"search company, country, email, type, frequency, reseller and campaign..."
  };

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.id);
  }
}

