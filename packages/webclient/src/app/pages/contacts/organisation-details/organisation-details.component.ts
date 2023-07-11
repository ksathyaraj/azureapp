import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'web-organisation-details',
  templateUrl: './organisation-details.component.html'
})

export class OrganisationDetailsComponent{

  constructor(private router: Router) {
  }
  
  helpLinkURL = webConstants.organisationDetailsHelpURL;
  addURL = '/contacts/organisations/0';
  updateURL = '/contacts/organisations';
  exportButton = true;
  organisationColumns: Column[] = [
    { columnDef: 'companyName', header: 'Organisation Name', columnType: ColumnType.link},
    { columnDef: 'website', header: 'Website'},
    { columnDef: 'telephone', header: 'Telephone'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton, colWidth:'1%' }
  ];
  api: api = {
    get: webApi.organisationContacts,
    deleteForHttpPostMethod: webApi.deleteOrganisationContact,
    export: webApi.exportOrganisation
  };
  title = 'resources.contacts-organisations-pageheading-organisationdetails';
  tabData: tabData[] = [
    {routerLink: '/contacts/organisations', header: 'resources.contacts-organisations-tabheading-organisationdetails', isActive: true},
    {routerLink: '/contacts/organisationContacts', header: 'resources.contacts-organisationcontacts-tabheading-organisationcontacts'}
  ];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.contacts-organisations-organisationdetails-label-warningmessage',
    deleteSuccessMessage: 'resources.contacts-organisations-deletesuccessmessage',
    confirmDeleteMessage: 'resources.contacts-organisations-confirmdeletemessage',
    tableSearchPlaceHolder: 'resources.contacts-organisations-searchplaceholder'
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }

} 