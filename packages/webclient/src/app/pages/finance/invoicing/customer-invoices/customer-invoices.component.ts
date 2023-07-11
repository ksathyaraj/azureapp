import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, ColumnType, api, searchUIOptions, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";

@Component({
  selector: "web-customer-invoices",
  templateUrl: "./customer-invoices.component.html",
})
export class CustomerInvoicesComponent{
  constructor(private router: Router, private modalService: ModalService){  
  }

  helpLinkURL = webConstants.supplierInvoiceHelpURL;
  addURL = 'finance/invoicing/customerinvoices/0';
  updateURL = 'finance/invoicing/customerinvoices';
  customerInvoiceColumns: Column[]=[
    { columnDef: 'formattedInvoiceNumber', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-invoicenumber',columnType: ColumnType.link},
    { columnDef: 'company', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-company'},
    { columnDef: 'projectName', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-projectname'},
    { columnDef: 'date', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-date', showDateFilter: true, defaultFilter: true},
    { columnDef: 'reportingTotal', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-amount', pullRight:true},
    {
      columnDef: '', header: 'resources.finance-invoicing-customerinvoices-tablecolumnheading-paid', columnCheckbox: ColumnType.checkbox,
      checkboxTitle: webConstants.isPaidTitle,
      checkboxClassField: (dataValue: any) => { return dataValue['reportingIsPaid'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, transparentBtn:true
    },
    { columnDef: 'reportingTotalOutstanding', header:'resources.finance-invoicing-customerinvoices-tablecolumnheading-amountoutstanding', pullRight:true, showDecimalFilter:true},
    { columnDef: '', header: '',columnCheckbox: ColumnType.checkbox,
    optionalCheckboxCondition: (dataValue: any) => { return dataValue.isFinalised },checkboxTitle:'resources.finance-invoicing-customerinvoices-button-finalise',
    checkboxClassField: (dataValue: any) => { return dataValue['isFinalised'] ? 'fa fa-check-square-o' : 'fa fa-square-o' } ,  columnPDF:ColumnType.pdf, optionalPDFCondition: (dataValue: any) => { return !dataValue.isFinalised }, columnEmail:ColumnType.email,optionalEmailCondition: (dataValue: any) => { return !dataValue.isFinalised }, columnType: ColumnType.deleteButton, optionalDeleteDisabled: (dataValue: any) => { return dataValue.isFinalised } }
  ]
  dataLoaded = true;
  api: api = {
    getWithDateRange: webApi.getCustomerInvoices,
    deleteForHttpPostMethod: webApi.deleteCustomerInvoice,
    checkboxUpdateApi: webApi.finaliseCustomerInvoice,
    pdf: webApi.PDFCustomerInvoice,
    email: webApi.customerInvoiceEmailDetail,
  };
  title = "resources.finance-invoicing-customerinvoices-pageheading-customerinvoices";
  searchUIOptions: searchUIOptions = {
    dateRange: true,
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-invoicing-customerinvoice-warningmessage',
    deleteSuccessMessage: 'resources.finance-invoicing-supplierinvoices-deletesuccessmessage',
    confirmDeleteMessage: 'resources.finance-invoicing-supplierinvoices-deleteconfirmmessage',
    tableSearchPlaceHolder: 'resources.finance-invoicing-supplierinvoice-searchplaceholder',
    messageModalTitle: 'resources.finance-invoicing-customerinvoices-finaliseinvoice',
    messageModalMessage:'resources.finance-invoicing-customerinvoices-finaliseinvoiceconfirmmessage',
    checkboxUpdateSuccessMessage: 'resources.finance-invoicing-customerinvoices-finaliseinvoicesuccessmessage',
    PDFModalHeading: 'resources.finance-invoicing-customerinvoices-pdfinvoice',
    emailModelHeading: 'resources.finance-invoicing-customerinvoices-button-emailthisinvoice',
    finalise: 'resources.finance-invoicing-customerinvoices-button-finalise',
    denyDeleteFinalised: 'resources.finance-invoicing-customerinvoices-button-finalisedinvoicecannotdeleted',
    alreadyFinalised: 'resources.finance-invoicing-customerinvoices-button-alreadyfinalised',
    pdf: 'resources.finance-invoicing-customerinvoices-button-pdfthisinvoice',
    pdfToBeFinalised: 'resources.finance-invoicing-customerinvoices-button-pdfthisalreadyfinalisedinvoice',
    email: 'resources.finance-invoicing-customerinvoices-button-emailthisinvoice',
    canOnlyEmailFinalisedInvoice: 'resources.finance-invoicing-customerinvoices-button-canonlyemailafinalisedinvoice',
    deleteItem: 'resources.finance-invoicing-customerinvoices-button-deletethisinvoice',
  };
  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }
  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
  handlePaidStatus(event: Event){
    this.modalService.messageModal(webConstants.paidInfo, webConstants.isPaidTitle)
  }
}