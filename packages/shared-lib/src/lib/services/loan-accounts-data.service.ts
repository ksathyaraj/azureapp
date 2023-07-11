import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoanAccountsDataService {

  constructor(private dataService: DataService) { }

  // getQueries(refresh: boolean, dataOperations: any, filterFn: any) {
  //   return this.dataService.getData('/api/queries', refresh, dataOperations, filterFn);
  // };

  getLoanAccountMonthDetail(customLedgerAccountId: any, loanAccountId: any, year: any, month: any, refresh: any) {
    return this.dataService.getLookupData('/api/loanaccount/details/' + customLedgerAccountId + '/' + loanAccountId + '/' + year + '/' + month, refresh);
  }

  // getLoanAccountItem(loanAccountItemId: any) {
  //   return this.dataService.getRecord('/api/loanaccountitem/' + loanAccountItemId);
  // };

  saveOwnersMoneyLoanAccountItem(loanAccountItem: any) {
    return this.dataService.post('/api/post/ownersmoney/loanaccountitem', { LoanAccountItems: loanAccountItem });
  }

  saveLoanAccountItem(loanAccountItem: any) {
    return this.dataService.post('/api/post/loanaccountitem', { LoanAccountItems: loanAccountItem });
  }

  deleteOwnersMoneyLoanAccountItem(loanAccountItemId: any) {
    return this.dataService.post('/api/delete/ownersmoney/loanaccountitem', { LoanAccountItemId: loanAccountItemId });
  }

  deleteLoanAccountItem(loanAccountItemId: any) {
    return this.dataService.post('/api/delete/loanaccountitem', { LoanAccountItemId: loanAccountItemId });
  }

  addOwnersMoneyLoanAccount(loanAccountName: any, loanAccountId: any, customLedgerAccountId: any) {
    return this.dataService.post('/api/post/ownersmoney/addLoanAccount', { LoanAccountName: loanAccountName, LoanAccountId: loanAccountId, customLedgerAccountId: customLedgerAccountId });
  }

  addLoanAccount(loanAccountName: any, loanAccountId: any, customLedgerAccountId: any) {
    return this.dataService.post('/api/post/addLoanAccount', { LoanAccountName: loanAccountName, LoanAccountId: loanAccountId, customLedgerAccountId: customLedgerAccountId });
  }

  // getDefaultLedgerAccountsForOwnerMoney() {
  //   return this.dataService.getLookupData('/api/ownersmoney/ledgeraccounts');
  // };

  // getDefaultLedgerAccountsForLoanAccounts() {
  //   return this.dataService.getLookupData('/api/loanaccounts/ledgeraccounts');
  // };

  // getLoanAccountMonthDetailPdf(customLedgerAccountId: any, loanAccountId: any, year: any, month: any) {

  //   var paramFilters: any[string] = [];
  //   paramFilters["customLedgerAccountId"] = customLedgerAccountId;
  //   paramFilters["loanAccountId"] = loanAccountId;
  //   paramFilters["year"] = year;
  //   paramFilters["month"] = month;

  //   return this.dataService.getReportWithParams('/api/pdf/loanaccount/details', paramFilters);
  // };

  // getBusinessLoanAccountMonthDetailPdf(customLedgerAccountId: any, loanAccountId: any, year: any, month: any) {

  //   var paramFilters: any[string] = [];
  //   paramFilters["customLedgerAccountId"] = customLedgerAccountId;
  //   paramFilters["loanAccountId"] = loanAccountId;
  //   paramFilters["year"] = year;
  //   paramFilters["month"] = month;

  //   return this.dataService.getReportWithParams('/api/pdf/businessloanaccount/details', paramFilters);
  // };
}
