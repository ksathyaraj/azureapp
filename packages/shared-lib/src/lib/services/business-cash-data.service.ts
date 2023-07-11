import { Injectable } from '@angular/core';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class BusinessCashDataService {

  constructor(private dataService: DataService) { }


        private getBusinessCashRoute = '/api/businesscash/';


       clearBusinessCashRouteCache = () => {
            return this.dataService.invalidateRouteCache(this.getBusinessCashRoute);
        }

        getQueries =  (refresh:boolean, dataOperations:any, filterFn:any) => {
            return this.dataService.getData('/api/queries', refresh, dataOperations, filterFn);
        };

        getBusinessCash = (year:string, month:string, refresh:boolean):any => {
            return this.dataService.getLookupData(this.getBusinessCashRoute + year + '/' + month, refresh);
        };
        
        //TODO getReportWithParams

        // getBusinessCashMonthDetailPdf =  (year:any, month:any) => {

        //     var paramFilters:any[string] = {};
        //     paramFilters["periodYear"] = year;
        //     paramFilters["periodMonth"] = month;

        //     return this.dataService.getReportWithParams('/api/pdf/businesscash', paramFilters);
        // };

        saveBusinessCash =  (businessCash:any) => {
            return this.dataService.post('/api/businessCash/save', businessCash);
        };

        deleteBusinessCash = (id:string) => {
            return this.dataService.post('/api/businessCash/' + id + '/delete');
        };

}
