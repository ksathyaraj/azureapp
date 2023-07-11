import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
@Component({
  selector: "web-export-data",
  templateUrl: "./export-data.component.html",
})
export class ExportDataComponent {
  placeHolderDate= webConstants.datePlaceHolderMessage
  exportTypesEnum: any
  fromDate: any
  toDate: any
  showAllAccounts: any
  exportType: any = ''
  constructor(
    private dataService: DataService,
    private messagingService: MessagingService,
    private dateService: DateService,
  ){}
  exportTypeObject: any
  openedStart = false
  openedEnd = false
  supportVideoBaseUrl = webConstants.exportDataVideoURL
  


  //Datepicker
  dateOptions = {
      'show-weeks': false
  }

  exportTypes: any

  getData(refresh: boolean) {
      this.dataService.getLookupData(webApi.exportTypes, refresh).subscribe((response:any)=> {
        this.exportTypes = response
      })
      this.dataService.getLookupData(webApi.exportTypesEnum, refresh).subscribe((response: any) => {
        this.exportTypesEnum = response
      })
  }

  exportTypeDropdownChange () {
      this.fromDate = null;
      this.toDate = null;
      this.showAllAccounts = false;
  }

  getExportTypeObject() {
     this.exportTypeObject = {
          exportType: this.exportType.key,
          fromDate: this.fromDate,
          toDate: this.toDate,
          showAllAccounts: this.showAllAccounts
      }

      return this.exportTypeObject;
  }

  getExportData(data: any) {
    var paramFilters: any[string] = [];
    paramFilters["fromDate"] = this.dateService.getFormattedDateForWebApi(data.fromDate);
    paramFilters["toDate"] = this.dateService.getFormattedDateForWebApi(data.toDate);
    paramFilters["exportType"] = data.exportType;
    paramFilters["showAllAccounts"] = data.showAllAccounts;

    return this.dataService.getReportWithParams(webApi.getExportData, paramFilters);
}

  download(frm:any) {
      this.messagingService.broadcastCheckFormValidatity();

      if (!frm.invalid) {
         this.getExportData(this.getExportTypeObject()).then((url:any) => {
              window.open(url, '_blank', '');
          });
      }
  };



  ngOnInit(){
    this.getData(true);
  }

}
