import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import {
  api
} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "web-general-ledger",
  templateUrl: "./general-ledger.component.html"
})
export class GeneralLedgerComponent {
  constructor(
    private dataService: DataService,
    private dateService: DateService,
    private notificationBarService: NotificationBarService
  ) {}
  selectedLedgerAccounts: any = '';
  ledgerAccounts:any=[];
  supportVideoBaseUrl = webConstants.generalLedgerHelpURL;
  modalHeading = "";
  reportHeading = "";
  isStartDateValid = false;
  isEndDateValid = false;
  fromDate: any = null;
  toDate: any = null;
  dateFormat = "DD/MM/YYYY";
  requests: any = [];

  //Datepicker
  dateOptions = {
    "show-weeks": false,
  };

  getData(refresh: boolean) {
    this.dataService
      .getRecord(webApi.getGeneralLedgerAccounts)
      .subscribe((response: any) => {
        this.ledgerAccounts = response;
      });
    
    this.refreshRequests();
  }
  ngOnInit() {
    this.getData(true);
  }

  api: api = {
    export: webApi.exportGeneralLedgerCsv,
    exportParams:{
      periodFrom:this.fromDate,
      periodTo:this.toDate,
      ledgerAccountIds:this.getFilterValues()
    }
  };

  fromDateRange(event:any){
    const from= this.dateService.getFormattedDateForWebApi(event);
    this.api.exportParams.periodFrom = from
  }
   toDateRange(event:any){
    const to= this.dateService.getFormattedDateForWebApi(event);
    this.api.exportParams.periodTo = to;
  }
  ledgerAccountsChange(){
    this.api.exportParams.ledgerAccountIds = this.getFilterValues()
  }
  request() {
    const ledgerAccountIds = this.getFilterValues();

    if (this.isStartDateValid && this.isEndDateValid) {
      const paramFilters: any[string] = [];
      paramFilters["periodFrom"] = this.dateService.getFormattedDateForWebApi(
        this.fromDate
      );
      paramFilters["periodTo"] = this.dateService.getFormattedDateForWebApi(
        this.toDate
      );
      paramFilters["ledgerAccountIds"] = ledgerAccountIds;

      this.dataService
        .getWithParams(webApi.requestGeneralLedgerPdf, paramFilters)
        .subscribe(() => {
          this.notificationBarService.success(
            "Request for General Ledger Report generation submitted."
          );
          this.refreshRequests();
        });
    }
  }

  getFilterValues() {
    this.isStartDateValid = true;
    this.isEndDateValid = true;

    if (this.fromDate !== null) {
      if (!this.dateService.isValidDate(this.fromDate, this.dateFormat)) {
        this.isStartDateValid = false;
        return;
      }
    }

    if (this.toDate !== null) {
      if (!this.dateService.isValidDate(this.toDate, this.dateFormat)) {
        this.isEndDateValid = false;
        return;
      }
    }

    let ledgerAccountIds = "";
    if (this.selectedLedgerAccounts != null) {
      for (let i = 0; i < this.selectedLedgerAccounts.length; i++) {
        ledgerAccountIds += this.selectedLedgerAccounts[i].id;
        if (i != this.selectedLedgerAccounts.length - 1)
          ledgerAccountIds += ",";
      }
    }
    return ledgerAccountIds;
  }
  downloadReport(url: string) {
    window.open(url, "_blank");
  }

  refreshRequests() {
    this.dataService
      .get(webApi.getGeneralLedgerRequests)
      .subscribe((result) => {
        this.requests = result;
      });
  }
}
