import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';

@Component({
  selector: "web-organisation-customer-projects",
  templateUrl: "./organisation-customer-projects.component.html",
})
export class OrganisationCustomerProjectsComponent {
  organisationId!:number;
  baseURL = "contacts/organisations/"
  constructor(private router: Router, private dataService: DataService,
    private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.organisationId = parseInt(params['id']);
  });
  }
  ngOnInit(){
    this.api.get = webApi.getProjects + '/' + this.organisationId;
    this.getOrganisationContactCustomerType()
  }
  getOrganisationContactCustomerType() {
    this.dataService.getLookupData(webApi.isOrganisationContactCustomerTypeFilepath + this.organisationId, false).subscribe((isOrganisationContactCustomerType: any) => {
      if(isOrganisationContactCustomerType)this.tabData.push({routerLink: '../invoices', header: 'resources.contacts-organisations-invoices-tabheading-invoices', isActive: false})
    });
  }
  helpLinkURL = webConstants.projectHelpURL;
  quotePrefix = '';
  exportButton = false;
  organisationProjectColumns: Column[] = [
    { columnDef: 'formattedProjectNumber', header: 'resources.contacts-organisations-projects-label-projectnumber', columnType: ColumnType.link},
    { columnDef: 'projectName', header: 'resources.contacts-organisations-projects-label-projectname'},
    { columnDef: 'description', header: 'resources.contacts-organisations-projects-label-projectdescription'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];
  api: api = {
    get: webApi.getProjects,
    deleteForHttpPostMethod: webApi.deleteProject,
  };
  title = 'resources.contacts-organisations-projects-pageheading-projects';
  tabData: tabData[] = [
    {routerLink: '../', header: 'resources.contacts-organisations-organisationdetails-tabheading-organisationdetail', isActive: false},
    {routerLink: '../contacts', header: 'resources.contacts-organisations-contacts-tabheading-contacts', isActive: false},
    {routerLink: '.', header: 'resources.contacts-organisations-projects-tabheading-projects', isActive: true},
  ];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage:"resources.contacts-organisations-organisationprojects-label-warningmessage",
    tableSearchPlaceHolder:"resources.contacts-organisations-projects-searchplaceholder",
    deleteSuccessMessage: "resources.contacts-organisations-projects-deletesuccessmessage",
    confirmDeleteMessage: "resources.contacts-organisations-projects-confirmdeletemessagee"
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.baseURL+this.organisationId+"/projects/0");
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.baseURL+this.organisationId+"/projects/"+param.id);
  }
}
