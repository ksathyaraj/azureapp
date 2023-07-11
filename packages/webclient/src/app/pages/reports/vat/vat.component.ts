import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { api, searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";

@Component({
  selector: "web-vat",
  templateUrl: "./vat.component.html",
  styleUrls: ["./vat.component.scss"],
})
export class VatComponent implements OnInit{
  constructor(private dataService: DataService, private dateService: DateService, private translateService: TranslateService){}

  helpLinkURL = webConstants.reportHelpUrl;
  start = '';
  end = '';
  api: api = {
    export: webApi.exportVat,
    exportParams: {start: this.dateService.getFormattedDateForWebApi(this.start), end: this.dateService.getFormattedDateForWebApi(this.end) },
    pdf: webApi.pdfVat,
    pdfParams: {start: this.dateService.getFormattedDateForWebApi(this.start), end: this.dateService.getFormattedDateForWebApi(this.end) }
  };
  searchUIOptions: searchUIOptions = {
    dateRange: true
  };
  vatReport:any = [];
  totalVatRefund = '';
  totalVatPayment = '';

  ngOnInit() {
   this.getTranslation();
  }

  getData() {
    const paramFilter = {
      start: this.dateService.getFormattedDateForWebApi(this.start), 
      end: this.dateService.getFormattedDateForWebApi(this.end)
    }
    this.dataService.getRecordWithParams(webApi.getVat, paramFilter)
    .subscribe((data:any) => {
      this.vatReport = data;
    })
  }
  
  handleRefreshButtonClick() {
    this.getData();
  }

  searchByDateRange(event:any) {
    this.start = event.fromDate;
    this.end = event.toDate;
    const updateParams = JSON.parse(JSON.stringify(this.api));
    updateParams.pdfParams = {start: event.fromDate, end: event.toDate};
    updateParams.exportParams = {start: event.fromDate, end: event.toDate};
    this.api = updateParams;
  }

  getTranslation() {
    this.translateService.get('resources.reports-vat-label-totalvatpayment').subscribe((res: string) => {
      this.totalVatPayment = res;
    });
    this.translateService.get('resources.reports-vat-label-totalvatrefund').subscribe((res: string) => {
      this.totalVatRefund = res;
    });
  }
}
