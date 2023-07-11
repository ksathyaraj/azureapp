import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal }  from 'packages/shared-lib/src/lib/services/api/webportal.api';
import { Router } from '@angular/router';

@Component({
  selector: "admin-campaign-registrations",
  templateUrl: "./campaign-registrations.component.html",
})
export class CampaignRegistrationsComponent {
  constructor(private router: Router){}
  
  updateURL = '/companies/company-'
  exportButton = false;
  campaignRegistrationColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login', columnType: ColumnType.link},
    { columnDef: 'primaryUserName', header: 'Username'},
    { columnDef: 'registeredDate',header: 'Registered',showDateTimeFilter:true},
    { columnDef: 'primaryContactEmail', header: 'Email'},
    { columnDef: 'primaryContactNumber', header: 'Mobile'},
    { columnDef: '', header: 'Can Login' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,  optionalCheckboxCondition: () => { return true},
    checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }},
    { columnDef: 'paymentType', header: 'Payment Type'},
    { columnDef: 'paymentFrequency', header: 'Payment Frequency'},
    { columnDef: 'campaignName', header: 'Campaign'},
    { columnDef: 'countryImageUrl', header: 'Country',showDateFilter:true ,columnType: ColumnType.image,columnDefTitle: 'countryName'}
  ];
  api: api = {
    get: webPortal.getCampaignRegistrations,
  };
  title = 'Campaign Registrations';
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: false
  };
  resourceMessages : resourceMessages = {
    tableSearchPlaceHolder:"search company, country, email, type, frequency, reseller and campaign..."
  };
  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.id);
  }

}
