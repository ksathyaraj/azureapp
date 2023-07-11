import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';

@Component({
  selector: "web-organisation-contact-by-organisation",
  templateUrl: "./organisation-contact-by-organisation.component.html",
})
export class OrganisationContactByOrganisationComponent {
  organisationId!:number;
  baseURL = "contacts/organisations/"
  constructor(private router: Router, private dataService:DataService,
    private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.organisationId = parseInt(params['id']);
  });
  }
  ngOnInit(){
    this.api.get = webApi.organisationIndividualContacts + '/' + this.organisationId;
    this.getOrganisationContactCustomerType();
  }
  getOrganisationContactCustomerType() {
    this.dataService.getLookupData(webApi.isOrganisationContactCustomerTypeFilepath + this.organisationId, false).subscribe((isOrganisationContactCustomerType: any) => {
      if(isOrganisationContactCustomerType)this.tabData.push({routerLink: '../invoices', header: 'resources.contacts-organisations-invoices-tabheading-invoices', isActive: false})
    });
  }
  helpLinkURL = webConstants.organisationDetailsHelpURL;
  quotePrefix = '';
  exportButton = false;
  organisationContactColumns: Column[] = [
    { columnDef: 'fullName', header: 'Name', columnType: ColumnType.link},
    { columnDef: 'emailAddress', header: 'Email'},
    { columnDef: 'contactType', header: 'Contact Type'},
    { columnDef: 'telephoneNumber', header: 'Telephone'},
    { columnDef: 'cellphone', header: 'Cellphone'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];
  api: api = {
    get: webApi.organisationIndividualContacts,
    deleteForHttpPostMethod: webApi.deleteOrganisationIndividualContact,
  };
  title = 'resources.contacts-organisationcontacts-pageheading-organisationcontacts';
  tabData: tabData[] = [
    {routerLink: '../', header: 'resources.contacts-organisations-organisationdetails-tabheading-organisationdetail', isActive: false},
    {routerLink: '.', header: 'resources.contacts-organisations-contacts-tabheading-contacts', isActive: true},
    {routerLink: '../projects', header: 'resources.contacts-organisations-projects-tabheading-projects', isActive: false},
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
    this.router.navigateByUrl(this.baseURL+this.organisationId+"/contacts/0");
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.baseURL+this.organisationId+"/contacts/"+param.id);
  }
}
