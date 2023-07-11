import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicingDataService {

  constructor(private dataService: DataService, private dateService: DateService) { }

  private getPricelistRoute = '/api/pricelist';
  private getQuotesRoute = '/api/quotes';
  private getInvoiceOutRoute = '/api/invoicesout';
  private getInvoiceInRoute = '/api/invoicesin';
  private getCreditNotesRoute = '/api/creditnotes';

  clearPricelistRouteCache() {
    return this.dataService.invalidateRouteCache(this.getPricelistRoute);
  }

  clearQuotesRouteCache() {
    return this.dataService.invalidateRouteCache(this.getQuotesRoute);
  }

  clearCustomerInvoiceRouteCache() {
    return this.dataService.invalidateRouteCache(this.getInvoiceOutRoute);
  }

  clearCreditNoteRouteCache() {
    return this.dataService.invalidateRouteCache(this.getCreditNotesRoute);
  }

  clearSupplierInvoiceRouteCache() {
    return this.dataService.invalidateRouteCache(this.getInvoiceInRoute);
  }

  // getSupplierInvoice(invoiceId: any) {
  //   return this.dataService.getRecord('/api/invoicesin/' + invoiceId);
  // };

  getSupplierInvoices(from: string, to: string, refresh: boolean, dataOperations: any, filterFn: any) {

    const paramFilters = {
      from: <any>null,
      to: <any>null
    };
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);

    return this.dataService.getDataWithParams('/api/invoicesin', paramFilters, refresh, dataOperations, filterFn);
  }

  getSupplierInvoiceLedgerAccounts(invoiceInItemType: any, refresh: boolean) {
    return this.dataService.getLookupData('/api/invoicesin/ledgerAccounts/' + invoiceInItemType, refresh);
  }

  saveSupplierInvoice(supplierInvoice: any) {

    supplierInvoice.createdDate = this.dateService.getFormattedDateForWebApi(supplierInvoice.createdDate);
    supplierInvoice.payByDate = this.dateService.getFormattedDateForWebApi(supplierInvoice.payByDate);

    return this.dataService.post('/api/post/invoicein', supplierInvoice);
  }

  deleteSupplierInvoice(id: any) {
    return this.dataService.post('/api/delete/invoicein/' + id);
  }

  getCustomerInvoices(from: string, to: string, refresh: boolean, dataOperations: any, filterFn: any) {

    const paramFilters = {
      from: <any>null,
      to: <any>null
    };
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);
    return this.dataService.getDataWithParams(this.getInvoiceOutRoute, paramFilters, refresh, dataOperations, filterFn);
  }

  // getCustomerInvoice(customerInvoiceId: any) {
  //   return this.dataService.getRecord('/api/invoiceout/' + customerInvoiceId);
  // };

  // getCustomerInvoicePdf(customerInvoiceId: any) {
  //   return this.dataService.getReport('/api/pdf/invoiceout/' + customerInvoiceId);
  // };

  saveCustomerInvoice(customerInvoice: any) {
    return this.dataService.post('/api/invoiceout/save', customerInvoice);
  }


  finaliseCustomerInvoice(id: any) {
    return this.dataService.post('/api/invoiceout/' + id + '/finalise');
  }

  deleteCustomerInvoice(id: any) {
    return this.dataService.post('/api/invoiceout/' + id + '/delete');
  }

  getQuotes(from: string, to: string, refresh: boolean, dataOperations: any, filterFn: any) {

    const paramFilters = {
      from: <any>null,
      to: <any>null
    };
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);
    return this.dataService.getDataWithParams(this.getQuotesRoute, paramFilters, refresh, dataOperations, filterFn);
  }

  // getQuote(quoteId: any) {
  //   return this.dataService.getRecord('/api/quotes/' + quoteId);
  // };
  // getQuoteEmailDetails(quoteId: any) {
  //   return this.dataService.getRecord('/api/quotes/getQuoteEmailDetails/' + quoteId);
  // };
  // getInvoiceEmailDetails(invoiceOutId: any) {
  //   return this.dataService.getRecord('/api/invoicesout/getInvoiceEmailDetails/' + invoiceOutId);
  // };
  // getQuotePdf(quoteId: any) {
  //   return this.dataService.getReport('/api/pdf/quote/' + quoteId);
  // };

  saveQuote(quote: any) {
    return this.dataService.post('/api/quote/save', quote);
  }
  SendQuoteEmail(cmd: any) {
    return this.dataService.post('/api/quote/SendQuoteEmail', cmd);
  }
  SendInvoiceEmail(cmd: any) {
    return this.dataService.post('/api/invoicesout/SendInvoiceEmail', cmd);
  }
  deleteQuote(id: any) {
    return this.dataService.post('/api/quote/' + id + '/delete');
  }

  convertQuote(id: any) {
    return this.dataService.post('/api/quote/' + id + '/convert');
  }

  getCreditNotes(from: string, to: string, refresh: boolean, dataOperations: any, filterFn: any) {

    const paramFilters = {
      from: <any>null,
      to: <any>null
    };
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);

    return this.dataService.getDataWithParams(this.getCreditNotesRoute, paramFilters, refresh, dataOperations, filterFn);
  }

  // getCreditNote(creditNoteId: any) {
  //   return this.dataService.getRecord('/api/creditnote/' + creditNoteId);
  // };

  // getCreditNotePdf(creditNoteId: any) {
  //   return this.dataService.getReport('/api/pdf/creditnote/' + creditNoteId);
  // };

  // getCreditNoteCustomerInvoices() {
  //   return this.dataService.getRecord('/api/creditnotableinvoices');
  // }

  // getCustomerInvoiceNumbers() {
  //   return this.dataService.getRecord('/api/customerInvoices');
  // }

  // addCreditNote(id: any) {
  //   return this.dataService.getRecord('/api/creditnote/' + id + '/add');
  // };

  saveCreditNote(creditNote: any) {

    creditNote.dateIssued = this.dateService.getFormattedDateForWebApi(creditNote.dateIssued);

    return this.dataService.post('/api/creditnote/save', creditNote);
  }

  getPricelist(refresh: boolean, dataOperations: any, filterFn: any) {
    return this.dataService.getData(this.getPricelistRoute, refresh, dataOperations, filterFn);
  }

  // getPricelistItem(id: any) {
  //   return this.dataService.getRecord('/api/pricelistitem/' + id);
  // };

  savePricelistItem(pricelistItem: any) {
    return this.dataService.post('/api/pricelistitem/save', pricelistItem);
  }

  deletePricelistItem(id: any) {
    return this.dataService.post('/api/pricelistitem/' + id + '/delete');
  }

  // getPricelistPdf() {
  //   return this.dataService.getReport('/api/pdf/pricelist');
  // };

  // getPricelistCsv() {
  //   return this.dataService.getReport('/api/csv/pricelist');
  // };

  saveQuoteStartingDetails(details: any) {
    return this.dataService.post('/api/startingdetails/quotes/save', details);
  }

  saveInvoiceStartingDetails(details: any) {
    return this.dataService.post('/api/startingdetails/invoices/save', details);
  }

  saveCreditNoteStartingDetails(details: any) {
    return this.dataService.post('/api/startingdetails/creditnotes/save', details);
  }

  priceListVatChangeOverStatus(details: any) {
    return this.dataService.post('/api/pricelistvatchangeoverstatus/save', details);
  }

}