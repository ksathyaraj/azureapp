import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { Router } from '@angular/router';
@Component({
  selector: "web-organisation-contacts",
  templateUrl: "./organisation-contacts.component.html",
})
export class OrganisationContactsComponent {

  constructor(private router: Router){}
  
  helpLinkURL = webConstants.organisationDetailsHelpURL;
  addURL = '/contacts/organisationContacts/0';
  updateURL = '/contacts/organisationContacts'
  quotePrefix = '';
  exportButton = true;
  organisationContactColumns: Column[] = [
    { columnDef: 'fullName', header: 'Name', columnType: ColumnType.link},
    { columnDef: 'company', header: 'Company'},
    { columnDef: 'emailAddress', header: 'Email'},
    { columnDef: 'contactType', header: 'Contact Type'},
    { columnDef: 'telephoneNumber', header: 'Telephone'},
    { columnDef: 'cellphone', header: 'Cellphone'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];
  api: api = {
    get: webApi.organisationIndividualContacts,
    deleteForHttpPostMethod: webApi.deleteOrganisationIndividualContact,
    export: webApi.exportOrganisationIndividualContacts
  };
  title = 'resources.contacts-organisationcontacts-pageheading-organisationcontacts';
  tabData: tabData[] = [
    {routerLink: '/contacts/organisations', header: 'Organisation Details'},
    {routerLink: '/contacts/organisationContacts', header: 'Organisation Contacts', isActive: true}
  ];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage:"resources.contacts-organisations-contacts-label-warningmessage",
    tableSearchPlaceHolder:"resources.contacts-organisationcontacts-searchplaceholder",
    deleteSuccessMessage: "resources.contacts-organisationcontacts-deletesuccessmessage",
    confirmDeleteMessage: "resources.contacts-organisationcontacts-confirmdeletemessage"
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
 
}
