import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class YodleeDataService {

  constructor(private dataService: DataService) { }

  yodleeSearchSitesRoute = '/api/yodlee/searchsites';


  clearYodleeSearchSitesCache () {
      this.dataService.invalidateRouteCache(this.yodleeSearchSitesRoute);
  }

  getYodleeSearchSites (refresh: boolean, dataOperations:any, filterFn:any, searchSite:any) {
      const paramFilters = {
        searchSites :<any> null,
            };
      paramFilters["searchSites"] = searchSite;
      return this.dataService.getDataWithParams(this.yodleeSearchSitesRoute, paramFilters, refresh, dataOperations, filterFn);
  }

  executeUserSearchRequest (refresh: boolean, dataOperations:any, filterFn:any, itemAccountId:any) {
      const paramFilters = {
        itemAccountId :<any> null,
            };
      paramFilters["itemAccountId"] = itemAccountId;
      return this.dataService.getDataWithParams('/api/yodlee/executeusersearchrequest', paramFilters, refresh, dataOperations, filterFn);
  }

  getYodleeSiteLoginForm (siteId:any) {
      const paramFilters = {
        siteId :<any> null,
            };
      paramFilters["siteId"] = siteId;
      return this.dataService.getRecordWithParams('/api/yodlee/getsiteloginform', paramFilters);
  }

  getItemSummariesForSite (siteAccountId:any) {
      const paramFilters = {
        siteAccountId :<any> null,
            };
      paramFilters["siteAccountId"] = siteAccountId;
      return this.dataService.getRecordWithParams('/api/yodlee/getitemsummariesforsite', paramFilters);
  }

  startSiterefresh (siteAccountId:any) {
      const paramFilters = {
        siteAccountId :<any> null,
            };
      paramFilters["siteAccountId"] = siteAccountId;
      return this.dataService.getRecordWithParams('/api/yodlee/startSiterefresh', paramFilters);
  }

  addSiteAccount (addSiteAccountPostModel:any) {

      return this.dataService.post('/api/yodlee/addSiteAccount', addSiteAccountPostModel);
  }

  getSiterefreshInfo (siteAccountId:any) {
      const paramFilters = {
        siteAccountId :<any> null,
            };
      paramFilters["siteAccountId"] = siteAccountId;
      return this.dataService.getRecordWithParams('/api/yodlee/getsiterefreshinfo', paramFilters);
  }

  unregisterUser () {
      return this.dataService.getRecord('/api/yodlee/unregisteruser',false);
  }

  clearYodleeDataCache () {
      return this.dataService.getRecord('/api/yodlee/clearYodleeDataCache',false);
  }

}
