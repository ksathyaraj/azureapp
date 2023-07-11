import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class ThumbzupPaymentsDataService {

  constructor(private dataService: DataService,private dateService: DateService) { }

  private paymentsRoute = '/api/thumbzup/viewpayments';

  getPayments  (from:any, to:any, refresh:boolean, dataOperations:any, filterFn:any) {

      const paramFilters:any = {};
      paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
      paramFilters.to = this.dateService.getFormattedDateForWebApi(to);

      return this.dataService.getDataWithParams(this.paymentsRoute, paramFilters, refresh, dataOperations, filterFn);
  }

  clearPaymentsCache  () {
      this.dataService.invalidateRouteCache(this.paymentsRoute);
  }

  addNewCashSalesPayment (payment:any) {
      return this.dataService.post('/api/thumbzup/addnewcashsalespayment', payment);
  }

  addNewInvoicePayment (payment:any) {
      return this.dataService.post('/api/thumbzup/addnewinvoicepayment', payment);
  }

}
