import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';
import { webApi } from './api/webclient.api';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(
              private dataService: DataService,
              private dateService: DateService
             ) { }

  getInvoiceOwedDashboardReport(fromDate: string | moment.Moment, refresh: boolean) {
    const paramFilters: any = {};
    paramFilters.fromDate = this.dateService.getFormattedDateForWebApi(fromDate);
    return this.dataService.getCacheableRecordWithParams(webApi.invoiceoweddashboardreport, paramFilters, true, refresh);
  }

  getInvoiceOwingDashboardReport(fromDate: string | moment.Moment, toDate: string | moment.Moment, refresh: boolean) {
      const paramFilters: any = {};
      paramFilters.fromDate = this.dateService.getFormattedDateForWebApi(fromDate);
      paramFilters.toDate = this.dateService.getFormattedDateForWebApi(toDate);
      return this.dataService.getCacheableRecordWithParams(webApi.invoiceowingdashboardreport, paramFilters, true, refresh);
  }

  getCashFlowDashboardReport(refresh: boolean) {
      return this.dataService.getCacheableRecord(webApi.cashflowdashboardreport, true, refresh);
  }

  getCashFlowExpenseDashboardReport(fromDate: string | moment.Moment, toDate: string | moment.Moment, refresh: boolean) {
      const paramFilters: any = {};
      paramFilters.fromDate = this.dateService.getFormattedDateForWebApi(fromDate);
      paramFilters.toDate = this.dateService.getFormattedDateForWebApi(toDate);
      return this.dataService.getCacheableRecordWithParams(webApi.cashflowexpensedashboardreport, paramFilters, true, refresh);
  }

  getDashboardDetailsReport(){
      return this.dataService.getRecord(webApi.dashboarddetailsreport, true);
  }
}
