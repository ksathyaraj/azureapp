import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';

@Injectable({
    providedIn: 'root'
})
export class AccountantDataService {

    constructor(private dateService: DateService, private dataService: DataService) { }

    private getAdjustmentsRoute = '/api/adjustments';
    private getCustomLedgerAccountsRoute = '/api/customledgeraccounts';

    clearAdjustmentsRouteCache() {
        return this.dataService.invalidateRouteCache(this.getAdjustmentsRoute);
    }

    clearCustomLedgerAccountsRouteCache() {
        return this.dataService.invalidateRouteCache(this.getCustomLedgerAccountsRoute);
    }

    getQueries(refresh: boolean, dataOperations: any, filterFn: any) {
        return this.dataService.getData('/api/queries', refresh, dataOperations, filterFn);
    }

    // getQueriesPdf() {
    //     return this.dataService.getReport('/api/pdf/queries');
    // };

    // getCustomLedgerAccounts(refresh: boolean, dataOperations: any, filterFn: any) {
    //     return this.dataService.getData(this.getCustomLedgerAccountsRoute, refresh, dataOperations, filterFn);
    // };

    // saveCustomLedgerAccount(customLedgerAccounts: any) {
    //     return this.dataService.post('/api/customLedgerAccounts/save', customLedgerAccounts);
    // };

    // getTrialbalance() {
    //     return this.dataService.getReport('/api/creditNoteReport');
    // };

    getAdjustments(refresh: boolean, dataOperations: any, filterFn: any) {
        return this.dataService.getData(this.getAdjustmentsRoute, refresh, dataOperations, filterFn);
    }

    getAdjustmentLedgerAccounts(refresh: any) {
        return this.dataService.getLookupData('/api/adjustmentLedgerAccounts', refresh);
    }

    // saveAdjustment(adjustment: any) {
    //     return this.dataService.post('/api/adjustment/save', adjustment);
    // };

    // getAdjustmentsPdf() {
    //     return this.dataService.getReport('/api/pdf/adjustments');
    // };

    // getGeneralLedgerPdf(from: any, to: any, ledgerAccountIds: any) {

    //     var paramFilters: any[string] = [];
    //     paramFilters["periodFrom"] = this.dateService.getFormattedDateForWebApi(from);
    //     paramFilters["periodTo"] = this.dateService.getFormattedDateForWebApi(to);
    //     paramFilters["ledgerAccountIds"] = ledgerAccountIds;

    //     return this.dataService.getReportWithParams('/api/pdf/generalledger', paramFilters);
    // };

    // exportGeneralLedgerCsv(from: any, to: any, ledgerAccountIds: any) {
    //     var paramFilters: any[string] = [];
    //     paramFilters["periodFrom"] = this.dateService.getFormattedDateForWebApi(from);
    //     paramFilters["periodTo"] = this.dateService.getFormattedDateForWebApi(to);
    //     paramFilters["ledgerAccountIds"] = ledgerAccountIds;

    //     return this.dataService.getReportWithParams('/api/csv/generalledger', paramFilters);
    // };

    // requestGeneralLedgerPdf(from: any, to: any, ledgerAccountIds: any) {
    //     var paramFilters: any[string] = [];
    //     paramFilters["periodFrom"] = this.dateService.getFormattedDateForWebApi(from);
    //     paramFilters["periodTo"] = this.dateService.getFormattedDateForWebApi(to);
    //     paramFilters["ledgerAccountIds"] = ledgerAccountIds;

    //     return this.dataService.getWithParams('/api/pdf/start/generalledger', paramFilters);
    // };

    // getGeneralLedgerRequests() {
    //     return this.dataService.get('/api/pdf/generalledger/requests');
    // };

    // getExportData(data: any) {
    //     var paramFilters: any[string] = [];
    //     paramFilters["fromDate"] = this.dateService.getFormattedDateForWebApi(data.fromDate);
    //     paramFilters["toDate"] = this.dateService.getFormattedDateForWebApi(data.toDate);
    //     paramFilters["exportType"] = data.exportType;
    //     paramFilters["showAllAccounts"] = data.showAllAccounts;

    //     return this.dataService.getReportWithParams('/api/getExportData', paramFilters);
    // };

    // getBalanceSheetPdf(periodEnd: any) {

    //     var paramFilters: any[string] = [];
    //     paramFilters["periodEnd"] = this.dateService.getFormattedDateForWebApi(periodEnd);

    //     return this.dataService.getReportWithParams('/api/pdf/balancesheet', paramFilters);
    // };

    // getIncomeStatementPdf(from: any, to: any) {
    //     var paramFilters: any[string] = [];
    //     paramFilters["periodFrom"] = this.dateService.getFormattedDateForWebApi(from);
    //     paramFilters["periodTo"] = this.dateService.getFormattedDateForWebApi(to);

    //     return this.dataService.getReportWithParams('/api/pdf/incomestatement', paramFilters);
    // };

    // getTakeOnBalances() {
    //     return this.dataService.getRecord('/api/takeOnBalances');
    // };

    // saveTakeOnBalances(takeOnBalances: any) {
    //     return this.dataService.post('/api/takeOnBalances/save', takeOnBalances);
    // };

    // getTrialBalancePdf(periodStart: any, periodEnd: any, showAllAccounts: any) {

    //     var paramFilters: any[string] = [];
    //     paramFilters["periodStart"] = this.dateService.getFormattedDateForWebApi(periodStart);
    //     paramFilters["periodEnd"] = this.dateService.getFormattedDateForWebApi(periodEnd);
    //     paramFilters["showAllAccounts"] = showAllAccounts;

    //     return this.dataService.getReportWithParams('/api/pdf/trialbalance', paramFilters);
    // };

    // getGeneralLedgerAccounts() {
    //     return this.dataService.getRecord('/api/generalledger/ledgeraccounts');
    // };
}
