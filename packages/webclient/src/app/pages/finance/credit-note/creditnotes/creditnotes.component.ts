import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";

@Component({
  selector: "web-creditnotes",
  templateUrl: "./creditnotes.component.html",
})
export class CreditnotesComponent {
 constructor(
  private modalService: ModalService,
  private router:Router,
 ) { }
  addURL = 'finance/invoicing/creditnotes/0/customerinvoice';
  updateURL = 'finance/invoicing/creditnotes';
 helpLinkURL = webConstants.creditNoteHelpUrl;
  exportButton = false;
  creditColumns: Column[] = [
    { columnDef: 'formattedCreditNoteNumber', header: 'Credit Note Number', columnType: ColumnType.link },
    { columnDef: 'companyName', header: 'Company' },
    { columnDef: 'createdDate', header: 'Date', showDateFilter:true },
    { columnDef: 'totalAmount', header: 'Amount', showDecimalFilter: true , pullRight: true},
    { columnDef: '', header: '', columnPDF: ColumnType.pdf }
  ]

    api: api = {
    getWithDateRange: webApi.creditnotes,
    pdf: webApi.pdfCreditNote,
    };
  
    title = 'resources.finance-invoicing-creditnote-pageheading-creditnotes';

  tabData: tabData[] = [];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true,
    dateRange: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-invoicing-supplierinvoice-warningmessage',
    PDFModalHeading: 'resources.finance-invoicing-creditnotes-pdfmodal-header-creditnotereport',
    tableSearchPlaceHolder: 'resources.finance-invoicing-creditnote-searchplaceholder'
  };
 handleAddButtonClick(event: Event){
   this.modalService.addNewCreditNote().result.then((invoiceOutId: any) => {
      this.router.navigateByUrl(this.addURL+'/'+invoiceOutId+'');
    })
 }
  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id+'/customerinvoice/0');
}
}
