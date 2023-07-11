import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { webConstants } from 'packages/shared-lib/src/lib/constants/web.constants';
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';

@Component({
  selector: 'web-finance',
  templateUrl: './quotes.component.html',
})
export class QuotesPageComponent {

  constructor(private router: Router) {
  }
  
  exportButton = false;
  helpLinkURL = webConstants.quotesHelpURL;
  addURL = '/finance/quotes/quotes/0';
  updateURL = '/finance/quotes/quotes/'
  quotesColumns: Column[] = [
    { columnDef: 'formattedQuoteNumber', header: 'resources.finance-quotes-quotes-tablecolumnheading-quotenumber', columnType: ColumnType.link, defaultFilter: true},
    { columnDef: 'companyName', header: 'resources.finance-quotes-quotes-tablecolumnheading-company'},
    { columnDef: 'projectName', header: 'resources.finance-quotes-quotes-tablecolumnheading-projectname'},
    { columnDef: 'createdDate', header: 'resources.finance-quotes-quotes-tablecolumnheading-date', showDateFilter:true},
    { columnDef: 'total', header: 'resources.finance-quotes-quotes-tablecolumnheading-amount', showDecimalFilter: true, pullRight: true},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton, columnPDF: ColumnType.pdf, columnInvoice: ColumnType.invoice, columnEmail: ColumnType.email }
  ];

  api: api = {
    getWithDateRange: webApi.quotes,
    deleteForHttpPostMethod: webApi.deleteQuotes,
    invoice: webApi.quote,
    pdf: webApi.PDFQuote,
    email: webApi.quoteEmailDetail
  };
 
  title = 'resources.finance-quotes-quotes-pageheading-quotes';

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true,
    dateRange: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-quotes-quotes-warningmessage',
    deleteSuccessMessage: 'resources.finance-quotes-quotes-deletesuccessmessage',
    confirmDeleteMessage: 'resources.finance-quotes-quotes-deletequotesconfirmmessage',
    tableSearchPlaceHolder: 'resources.finance-quotes-quotes-searchplaceholder',
    questionModalTitle: 'resources.finance-quotes-quotes-convertquote-heading-convertquote',
    questionModalMessage: 'resources.finance-quotes-quotes-convertquote-confirmmessage',
    PDFModalHeading: 'resources.finance-quotes-quote-pdfmodal-header-quotereport',
    emailModelHeading: 'resources.reports-emailmodel-modelheading-emailtype-quote'
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigate([this.updateURL+param.id]);
  }
}
