import { Injectable } from '@angular/core';
import {DateService} from "../services/date.service"

@Injectable({
  providedIn: 'root'
})
// class filterSettings {

//   constructor(private dateService: DateService) { }
//   search = null;
//   from = this.dateService.getDefaultFromDate();
//   to = this.dateService.getDefaultToDate();
// };
export class FilterSettingsService {

  constructor(private dateService: DateService) { }
  
    organisations={
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    customerInvoices=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    salesleads=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    staffdetails=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    payslips=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    quotes=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    pricelist=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    supplierInvoices=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    creditNotes=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    askMyAccountant=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    customLedgerAccounts=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    adjustments=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    companySalarySchedule=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    receivedMessages=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    generalLedger=   {
      search :null,
    };
    balanceSheet=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    incomeStatement=   {
      search :null,
    };
    trialBalance=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    vatReport=   {
      search :null,
    };
    thumbzupPayments=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    customerInvoicesDue=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    customerAgeAnalysis=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    supplierInvoicesDue=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    supplierAgeAnalysis=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    searchSites=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };
    transactionDetails=   {
      search :null,
      from : this.dateService.getDefaultFromDate(),
      to : this.dateService.getDefaultToDate(),
    };

}
