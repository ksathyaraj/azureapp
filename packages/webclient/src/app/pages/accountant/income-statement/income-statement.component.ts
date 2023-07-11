import { Component } from "@angular/core";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { api,resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
@Component({
  selector: "web-income-statement",
  templateUrl: "./income-statement.component.html",
})
export class IncomeStatementComponent {
constructor(
    private dateService: DateService,
){}
fromDate:any = null
toDate:any = null
supportVideoBaseUrl = webConstants.incomeStatementURL
placeHolderDate = webConstants.datePlaceHolderMessage

  filterSettingsTrialBalance=   {
    search :null,
    from : this.dateService.getDefaultFromDate(),
    to : this.dateService.getDefaultToDate(),
  }

  api: api = {
   export: webApi.exportTrialBalanceCsv,
   exportParams:  {
        exportType:3,
        fromDate: this.dateService.getFormattedDateForWebApi(this.fromDate),
        toDate:  this.dateService.getFormattedDateForWebApi(this.toDate),
        showAllAccounts:null
    },
    pdf: webApi.incomeStatement,
    pdfParams: {
        periodFrom: this.dateService.getFormattedDateForWebApi(this.fromDate),
        periodTo: this.dateService.getFormattedDateForWebApi(this.toDate),
    }
  };

  fromDateRange(event:any){
    this.filterSettingsTrialBalance.from = this.dateService.getFormattedDateForWebApi(event);
    this.api.exportParams.fromDate = this.filterSettingsTrialBalance.from
    this.api.pdfParams.periodFrom = this.filterSettingsTrialBalance.from
  }

   toDateRange(event:any){
    this.filterSettingsTrialBalance.to = this.dateService.getFormattedDateForWebApi(event);    
    this.api.exportParams.toDate = this.filterSettingsTrialBalance.to;
    this.api.pdfParams.periodTo = this.filterSettingsTrialBalance.to;
  }

  resourceMessages : resourceMessages = {
    PDFModalHeading:"resources.accountant-incomestatement-pdfmodal-header-incomestatement",
  };

}
