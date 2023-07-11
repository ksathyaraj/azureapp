import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "web-organisation-customer-invoices",
  templateUrl: "./organisation-customer-invoices.component.html",
})
export class OrganisationCustomerInvoicesComponent {
  organisationId!:number;
  updateURL = "finance/invoicing/customerinvoices/"
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.organisationId = parseInt(params['id']);
  });
  }
  ngOnInit(){
    this.api.get = webApi.getOrganisationContactCustomerInvoices + '/' + this.organisationId;
  }
  helpLinkURL = webConstants.projectHelpURL;
  quotePrefix = '';
  exportButton = false;
  addNewButton = false;
  organisationInvoicesColumns: Column[] = [
    { columnDef: 'formattedInvoiceNumber',colWidth:"42%", header: 'resources.contacts-organisations-invoices-tablecolumnheading-invoicenumber', columnType: ColumnType.link},
    { columnDef: 'dateFinalised',showDateFilter:true, header: 'resources.contacts-organisations-invoices-tablecolumnheading-invoicedate'},
    { columnDef: 'reportingTotal',showDecimalFilter:true,pullRight:true, header: 'resources.contacts-organisations-invoices-tablecolumnheading-amount'},
    { columnDef: '',hideSorting:true, header: 'resources.contacts-organisations-invoices-tablecolumnheading-paid' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,  optionalCheckboxCondition: () => { return true},
    checkboxClassField: (dataValue: any) => { return dataValue['reportingIsPaid'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }},
    { columnDef: 'reportingTotalOutstanding',showDecimalFilter:true,pullRight:true, header: 'resources.contacts-organisations-invoices-tablecolumnheading-amountoutstanding'},
  ];
  api: api = {
    get: webApi.getOrganisationContactCustomerInvoices,
    deleteForHttpPostMethod: webApi.deleteProject,
  };
  title = 'resources.contacts-organisations-projects-pageheading-projects';
  tabData: tabData[] = [
    {routerLink: '../', header: 'resources.contacts-organisations-organisationdetails-tabheading-organisationdetail', isActive: false},
    {routerLink: '../contacts', header: 'resources.contacts-organisations-contacts-tabheading-contacts', isActive: false},
    {routerLink: '../projects', header: 'resources.contacts-organisations-projects-tabheading-projects', isActive: false},
    {routerLink: '.', header: 'resources.contacts-organisations-invoices-tabheading-invoices', isActive: true},
  ];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    tableSearchPlaceHolder:"resources.contacts-organisations-invoices-searchplaceholder",
  };

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.id);
  }
}
