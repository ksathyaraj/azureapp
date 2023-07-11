import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environments/environment'
import * as moment from 'moment/moment'
import { Observable, map } from 'rxjs';
import { QueryBuilderService } from './query-builder.service'
import { SessionService } from './session.service'
import { PortalSessionService } from './portal/session.service';
import Enumerable from 'linq';
import { DomSanitizer } from '@angular/platform-browser'
import { authTokenParam } from '../interfaces/webclient.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private queryBuilderService : QueryBuilderService,private sessionService: SessionService, private portalSessionService: PortalSessionService, private sanitizer:DomSanitizer) { }
  
  private cache: any = {};
  private api_auth_key = env.api_auth_key;
  private api_auth_key_header = 'api_auth_key';
  private x_apim_key = env.x_apim_key;
  private x_apim_key_header = 'x_apim_key';
  private pagedData: any = {};
  private baseURL = env.serverBaseUrl;
  private authTokenParam: authTokenParam = {
    authtoken: this.sessionService.accessToken !== undefined ? this.sessionService.accessToken : this.portalSessionService.accessToken,
    api_auth_key: this.api_auth_key,
    x_apim_key: this.x_apim_key
  };

  //TODO - file uploader support

  getFileUploaderInstance(route: string, formData: any) {
    return this.http.post(route, formData, {
      reportProgress: true,
      observe: "events"
    });
  }

  // getFileUploaderInstanceWithData = function (route) {
  //     return new FileUploader({
  //         url: baseUrl + route,
  //         formData: [],
  //         headers: {
  //             Authorization: 'Bearer ' + Session.accessToken,
  //             api_auth_key: api_auth_key,
  //             x_apim_key: x_apim_key
  //         }
  //     });
  // }

  invalidateCache(): void {
      this.cache = {};
  }

  invalidateRouteCache(route: string): void {
      this.setCacheValue(route);
  }

  post(route: string, data?: any) {
      const start = moment(); // jshint ignore:line
      return this.http.post<httpResponse>(route, data)
      .pipe(map(result => {
        this.consoleLogRequestTime( route, start, moment()); // jshint ignore:line
        return result;
      }));
  }

  get(route: string) {
      const start = moment(); // jshint ignore:line
      return this.http.get<httpResponse>(route).pipe(map((result) => {
          this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
          return result;
      }));
  }

  getWithParams(route: string, paramValues: any) {
      return this.get(this.queryBuilderService.getQueryUrl(route, paramValues));
  }

  delete(route: string) {
      const start = moment(); // jshint ignore:line
      return this.http.delete<httpResponse>(route).pipe(map((result) => {
          this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
          return result;
      }));
  }

  //TODO - support below methods

  getReport(route: string) {
      return new Promise((resolve, reject) => { 
        const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.queryBuilderService.getQueryUrl(route, this.authTokenParam)));
        resolve(url); 
      })
  }

  getReportWithParams(route: string, paramValues: any) {
    const parameters = {...paramValues, ...this.authTokenParam};
    return new Promise((resolve, reject) => { 
      const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.queryBuilderService.getQueryUrl(route, parameters)));
      resolve(url); 
    })
}


  getRecord(route: string, hideOverlay?: boolean) {
      const paramValues = {
          t: moment().millisecond()
      };
      return this.getRecordWithParams(route, paramValues, hideOverlay);
  }

  getCacheableRecord(route: string, hideOverlay: boolean, refresh: boolean) {
      const paramValues = { t: moment().millisecond() };
      return this.getCacheableRecordWithParams(route, paramValues, hideOverlay, refresh);
  }


  //TODO - hide overlay
    getRecordWithParams(route: string, paramValues: any, hideOverlay?: boolean) {
      const start = moment(); // jshint ignore:line
      // return this.http.get<httpResponse>(route, { params: paramValues, hideOverlay: hideOverlay }).pipe(map((result) => {
      return this.http.get<httpResponse>(route, { params: paramValues }).pipe(map((result) => {
          this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
          return result;
      }));
  }

  getCacheableRecordWithParams(route: string, paramValues: any, hideOverlay: boolean, refresh: boolean) {
      if (this.dataForRouteIsCached(route, refresh)) {
          return this.getCacheValue(route);
      } else {
          const start = moment(); // jshint ignore:line
          const params = { params: paramValues, hideOverlay: hideOverlay };
          return this.http.get<httpResponse>(route, params).pipe(map((result) => {
              this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
              this.setCacheValue(route, result);
              return result;
          }));
      }
  }

  getLookupData(route: string, refresh?: boolean, hideOverlay?: boolean) {
      const paramValues = {
          t: moment().millisecond()
      }
      return this.getLookupDataWithParams(route, paramValues, refresh, hideOverlay);
  }

  getLookupDataWithParams(route: string, paramValues: any, refresh?: boolean, hideOverlay?: boolean) {

      if (this.dataForRouteIsCached(route, refresh)) {
          return  new Observable((observer) => {observer.next(this.getCacheValue(route))})
      } else {
          const start = moment(); // jshint ignore:line
          const params = paramValues ? { params: paramValues, hideOverlay: hideOverlay } : {};
          return this.http.get<httpResponse>(route, params).pipe(map((result) => {
              this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
              this.setCacheValue(route, result);
              return result;
          }));
      }
  }

  getDataWithParams(route: string, paramValues: any, refresh: boolean, dataOperations: any, filterFn: any) {
      if (this.dataForRouteIsCached(route, refresh)) {
          return this.getPagedData(this.getCacheValue(route), dataOperations, filterFn);
      } else { //no cached data or refresh requested
          const start = moment(); // jshint ignore:line
          paramValues.t = start.millisecond();
          return this.http.get<httpResponse>(route, { params: paramValues })
              .pipe(map((result) => {
                  this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
                  this.setCacheValue(route, result);
                  return this.getPagedData(this.getCacheValue(route), dataOperations, filterFn);
              }));
      }
  }

  getData(route: string, refresh:boolean, dataOperations: any, filterFn: any, getDataToPageFn?: any, paramFilters?: any) {
      if (this.dataForRouteIsCached(route, refresh)) {
          return new Observable((observer)=> {
            observer.next(this.getPagedData(this.getCacheValue(route), dataOperations, filterFn, getDataToPageFn))
          })   
      } else { //no cached data or refresh requested
          const start = moment(); // jshint ignore:line
          let paramDetails = {};
          if(paramFilters) {
            paramDetails = {
              params: paramFilters
            } 
          }

          return this.http.get<httpResponse>(route,paramDetails)
              .pipe(map((result) => {
                  this.consoleLogRequestTime(route, start, moment()); // jshint ignore:line
                  this.setCacheValue(route, result);
                  return this.getPagedData(this.getCacheValue(route), dataOperations, filterFn, getDataToPageFn);
              }));
      }
  }

  getPagedData(data: any, dataOperations: any, filterFn: any, getDataToPageFn?: any) {
      getDataToPageFn = getDataToPageFn || function (data: any) { return data; }
      filterFn = filterFn || function (datum: any) { return datum; }

      const dataToPage = getDataToPageFn(data);
      const take = dataOperations.paging.pageSize;
      const skip = dataOperations.paging.currentPage ? (dataOperations.paging.currentPage - 1) * dataOperations.paging.pageSize : 0;
      const filteredData = Enumerable.from(dataToPage).where(filterFn);

      let sortedData;
      const sortFn = function (datum: any) {

            const formats = [
                moment.ISO_8601,
                "DD/MM/YYYY"
            ];
        
          
          if (moment(datum[dataOperations.sortPredicate],formats,true).isValid())
          {
              return moment(datum[dataOperations.sortPredicate],formats,true);
          }

          if (datum[dataOperations.sortPredicate] && typeof datum[dataOperations.sortPredicate] === 'string')
              return datum[dataOperations.sortPredicate].toLowerCase();
          else
              return datum[dataOperations.sortPredicate];

      };

      if (dataOperations.sortPredicate) {
          if (dataOperations.sortOrder) {
              sortedData = Enumerable.from(filteredData.toArray()).orderBy(sortFn);
          } else {
              sortedData = Enumerable.from(filteredData.toArray()).orderByDescending(sortFn);
          }
      } else {
          sortedData = filteredData;
      }

      this.pagedData = {
        originalDataset: data,
        allData: dataToPage,
        pagedData: (sortedData && sortedData.toArray().length <= skip) ? sortedData.toArray() : sortedData.skip(skip).take(take).toArray(),
        filteredDataCount: filteredData.count(),
        dataCount: dataToPage.length
      };
      return this.pagedData;
  }

  dataForRouteIsCached(route: string, refresh?: boolean) {
      return this.cache[route] && (refresh === false || refresh == undefined);
  }

  setCacheValue(key:string, value?: object) {
      this.cache[key] = value;
  }

  getCacheValue(key:string) {
      return this.cache[key]
  }

  private consoleLogRequestTime(action: string, start: moment.Moment, end: moment.Moment) {
      console.log(action + ' took: ' + Math.round(end.valueOf() - start.valueOf()) + ' milliseconds, from: ' + start.format('h:mm:ss.SSS') + ' to: ' + end.format('h:mm:ss.SSS'));
  }
  
}

interface httpResponse {
  data: object
}
