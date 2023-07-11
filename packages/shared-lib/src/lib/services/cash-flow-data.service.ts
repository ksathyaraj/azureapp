import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class CashFlowDataService {

  constructor(private dataService: DataService, private dateService: DateService) { }

  getCashFlow(showAllCategories: any) {

    const paramFilters: any[string] = [];
    paramFilters.showAllCategories = showAllCategories;

    return this.dataService.getRecordWithParams('/api/cashflow', paramFilters);
  }

  getCashFlowDetails(ledgerAccountId: any, dateRepresented: any, cashFlowType: any) {
    const paramFilters: any[string] = [];
    paramFilters.ledgerAccountId = ledgerAccountId;
    paramFilters.dateRepresented = this.dateService.getFormattedDateForWebApi(dateRepresented);
    paramFilters.cashFlowType = cashFlowType;

    return this.dataService.getRecordWithParams('/api/cashflowledgerentries', paramFilters);
  }

  saveCashFlow(cashFlow: any) {
    return this.dataService.post('/api/cashFlow/save', cashFlow);
  }
}
