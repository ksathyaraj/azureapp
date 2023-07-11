import { Component } from "@angular/core";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, api, dropDownFilter, searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";

@Component({
  selector: "admin-usage-report",
  templateUrl: "./usage-report.component.html"
})
export class UsageReportComponent {

  constructor(private dataService: DataService, private dateService: DateService) {}

  usageReportColumns: Column[] = [
    { columnDef: 'functionName', header: 'Function'},
    { columnDef: 'uniqueUserCount', header: 'Unique User Count'},
  ];
  api: api = {
    getWithDateRange: webPortal.getUsageReport,
    dropDownFilter: {registrationSource: 5}
  };
  title = 'Usage Report';
  searchUIOptions: searchUIOptions = {
    dateRange: true,
    dropdown: true
  };
  dropDownFilter: dropDownFilter = {
    smOptions: portalConstants.registrationSource,
    smRequired: false,
    smLabel: "Source",
    smOptionDisplayField: 'value',
    smOptionValueField: 'id',
    smPlaceholder: "select",
    smLabelClass: "col-md-2",
    selectedSearchFilterDropdown: 5
  };
  
  handleTitleButtonAction(params:any) {
    const paramFilters = {from:'',to:'',registrationSource:0};
    paramFilters.from = this.dateService.getFormattedDateForWebApi(params.data.from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(params.data.to);
    paramFilters.registrationSource = this.api.dropDownFilter.registrationSource;
    if(params.event.id === 7) {
      this.dataService.getReportWithParams(webPortal.usageReport, paramFilters).then((dataUrl:any) => {
        window.open(dataUrl, '_blank', '');
      });
    } else {
      this.dataService.getReportWithParams(webPortal.detailedReport, paramFilters).then((dataUrl:any) => {
        window.open(dataUrl, '_blank', '');
      });
    }
  }
}
