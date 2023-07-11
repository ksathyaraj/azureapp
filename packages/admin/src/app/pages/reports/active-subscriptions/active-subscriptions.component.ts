import { Component } from "@angular/core";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, ColumnType, api, dataOperation, resourceMessages, searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { from } from "rxjs";
@Component({
  selector: "admin-active-subscriptions",
  templateUrl: "./active-subscriptions.component.html",
  styleUrls: ["./active-subscriptions.component.scss"],
})
export class ActiveSubscriptionsComponent {
  constructor(
    private dateService: DateService,
    private dataService: DataService
  ) { }
  detailCountry: any;
  detailReportingCategory: any;
  pagedData: any = null;
  fullCount =0;
  filteredCount =0;
  from: any = undefined;
  summaryData: any = [];
  totals: any;
  countryId = 0;
  title = '';
  reportingCategoryId ='';
  isLoading = false;
    
  detailColumns: Column[] = [
    { columnDef: 'sanitizedName', header: 'Company Login',columnType: ColumnType.link,},
    { columnDef: 'primaryUserName', header: 'Username'},
    { columnDef: 'registeredDate', header: 'Registered',showDateTimeFilter:true },
    { columnDef: 'primaryContactEmail', header: 'Email' },
    { columnDef: 'primaryContactNumber', header: 'Mobile' },
    {
      columnDef: '', header: 'Can Login ', columnCheckbox: ColumnType.checkbox, hideSorting: true,
      optionalCheckboxCondition: (dataValue: any,originalDataSet:any) => { return dataValue.canLogin || !originalDataSet.canLogin },
      checkboxClassField: (dataValue: any) => { return dataValue['canLogin'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }, transparentBtn: true
    },
  ]
  additionalGetPageResponse = 'data';
  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder: "search company login, Username or Email ..."
  };
  searchUIOptions: searchUIOptions = {
      searchInput: true,
  };
  api: api = {
    get: '',
    export:webPortal.exportActiveSubscription,
    exportParams: { countryid:this.countryId, reportingCategoryId:this.reportingCategoryId, startDate: this.startingDate },
    
  };
  ngOnInit() {
    this.getData(this.from, true);
  }
  startingDate(event: any) {
    this.from = event;
  }
  refresh() {
    this.pagedData = null;
    this.getData(this.from, true);
  }
  getData(from: any, refresh: boolean) {
    const paramFilters = {
      startDate : ''
    };
    paramFilters["startDate"] = this.dateService.getFormattedDateForWebApi(from);
    this.dataService.getLookupDataWithParams(webPortal.getActiveSubscriptionSummary, paramFilters, refresh).subscribe((result: any) => {
      this.totals = result;
      this.summaryData = result.data;
    })
  }
  getDetailData(countryid: number, reportingCategoryId: any, from: any, refresh: boolean) {
    const startDate = this.dateService.getFormattedDateForWebApi(from);
    const updateParams = JSON.parse(JSON.stringify(this.api));
    updateParams.get =  webPortal.activesubscriptionsdetail + '?countryid=' + countryid + '&reportingCategoryId=' + reportingCategoryId + '&startDate=' + startDate;
    this.api = updateParams;
    this.isLoading = true;
    this.title = 'Companies in ' + this.detailCountry + ' for ' + this.detailReportingCategory;
    this.api.exportParams.countryid = this.countryId;
    this.api.exportParams.reportingCategoryId = this.reportingCategoryId;
    this.api.exportParams.startDate = startDate;
  }
   
}