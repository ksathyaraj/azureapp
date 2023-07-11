import { Component } from "@angular/core";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { tabData,api,resourceMessages} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";



@Component({
  selector: "web-company-salary-schedule",
  templateUrl: "./company-salary-schedule.component.html",
})
export class CompanySalaryScheduleComponent {

  constructor(private dateService: DateService,
  ) {
}

  ngOnInit() {
    this.fromDateRange(this.fromDate);
    this.toDateRange(this.toDate)  
  }

  helpLinkUrl = webConstants.companySalaryScheduleHelpUrl;
  datePlaceHolder = webConstants.datePlaceHolderMessage
  exportButton = true;
  pdfButton = true;
  refreshButton = false;
  addNewButton = false;
  showSpinner = false;
  fromDate: any =this.dateService.getDefaultFromDate();
  toDate: any = this.dateService.getDefaultToDate();


   fromDateRange(event:any){
    const fromDate = this.dateService.getFormattedDateForWebApi(event);
    this.api.exportParams.from = fromDate;
    this.api.pdfParams.from = fromDate;

  }
   toDateRange(event:any){
     const toDate = this.dateService.getFormattedDateForWebApi(event);    
     this.api.exportParams.to = toDate;
     this.api.pdfParams.to = toDate;

  }
  api: api = {
    export: webApi.exportCsv,
    exportParams: { from: this.fromDate, to: this.toDate},
    pdf: webApi.exportPdf,
    pdfParams: { from: this.fromDate, to: this.toDate }
  }

  tabData: tabData[] = [
    { routerLink: '/staff/companysalaryschedule', header: 'resources.staff-companysalaryschedule-tabheading-companysalaryschedule', isActive: true },
    { routerLink: '/staff/individualsalaryschedule', header: 'resources.staff-individualsalaryschedule-tabheading-individualsalaryschedule' },
  ]

  resourceMessages : resourceMessages = {
    PDFModalHeading:"resources.staff-companysalaryschedule-pageheading-companysalaryschedule",
  };

  hideSpinner() {
    this.showSpinner = false;
  }
}


