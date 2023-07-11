import { Component } from "@angular/core";
import { Column, ColumnType, api, searchUIOptions,resourceMessages } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { Router } from '@angular/router';

@Component({
  selector: "web-sales-leads",
  templateUrl: "./sales-leads.component.html",
})
export class SalesLeadsComponent {
  constructor(
    private router:Router,
    ){}
  addURL = '/contacts/salesleads/0';
  updateURL = '/contacts/salesleads';
  quotePrefix = '';
  deleteSuccessMessage = '';
  title = 'resources.contacts-salesleads-pageheading-salesleads';
  supportVideoUrl = webConstants.supportVideoUrl;

  salesLeadsColumns: Column[] = [
    { columnDef: 'name', header: 'Name', columnType: ColumnType.link},
    { columnDef: 'email', header: 'Email'},
    { columnDef: 'cellphone', header: 'Cellphone'},
    { columnDef: 'alternateContactNumber', header: 'Alternate Contact'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];

  api: api = {
    get: webApi.salesLeads,
    deleteForHttpPostMethod: webApi.deleteSalesLead,
  };

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.contacts-salesleads-label-warningmessage',
    deleteSuccessMessage: 'resources.contacts-salesleads-deletesuccessmessage',
    confirmDeleteMessage: 'resources.contacts-salesleads-confirmdeletemessage',
    tableSearchPlaceHolder: 'resources.contacts-salesleads-searchplaceholder'
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
}
