import { Component } from "@angular/core";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { api, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "web-trial-balance",
  templateUrl: "./trial-balance.component.html",
})
export class TrialBalanceComponent {

  constructor(private dateService : DateService){}
  
  showAllAccounts = false;
  openedEnd = false;
  supportVideoBaseUrl = webConstants.trialBalanceHelpURL

  filterSettingsTrialBalance=   {
    search :null,
    from : this.dateService.getDefaultFromDate(),
    to : this.dateService.getDefaultToDate(),
  };
  api: api = {
    export: webApi.exportTrialBalanceCsv,
    exportParams:{
      exportType:2,
      fromDate: this.filterSettingsTrialBalance.from,
      toDate: this.filterSettingsTrialBalance.to,
      showAllAccounts: this.showAllAccounts
      },
    pdf: webApi.exportTrialBalancePdf,
    pdfParams:{
      periodStart: this.filterSettingsTrialBalance.from,
      periodEnd: this.filterSettingsTrialBalance.to,
      showAllAccounts: this.showAllAccounts
      },
  };

  resourceMessages : resourceMessages = {
    PDFModalHeading:"resources.accountant-trialbalance-pdfmodal-header-trialbalance",
  };

  fromDateRange(event:any){
    this.filterSettingsTrialBalance.from = this.dateService.getFormattedDateForWebApi(event);
    this.api.exportParams.fromDate = this.filterSettingsTrialBalance.from
    this.api.pdfParams.periodStart = this.filterSettingsTrialBalance.from

  }
   toDateRange(event:any){
    this.filterSettingsTrialBalance.to = this.dateService.getFormattedDateForWebApi(event);    
    this.api.exportParams.toDate = this.filterSettingsTrialBalance.to;
    this.api.pdfParams.periodEnd = this.filterSettingsTrialBalance.to;

  }
  showAccountsChanged(event:any){
    this.api.exportParams.showAllAccounts=event;
    this.api.pdfParams.showAllAccounts=event;
  }
 
  getFilterSettings(viewModel:any, filterSettings:any) {
      filterSettings.periodStart = viewModel.periodStart ? this.dateService.getFormattedMoment(viewModel.periodStart) : null;
      filterSettings.periodEnd = viewModel.periodEnd ? this.dateService.getFormattedMoment(viewModel.periodEnd) : null;
  }

}
