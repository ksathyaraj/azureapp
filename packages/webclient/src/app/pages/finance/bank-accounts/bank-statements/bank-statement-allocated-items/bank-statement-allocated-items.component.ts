import { Component } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { TranslateService } from "@ngx-translate/core";
import { env } from "packages/shared-lib/src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
@Component({
  selector: "web-bank-statement-allocated-items",
  templateUrl: "./bank-statement-allocated-items.component.html",
  styleUrls: ["./bank-statement-allocated-items.component.scss"],
})
export class BankStatementAllocatedItemsComponent {
  subHeading: string | undefined;
  data: any;
  showVatColumns: any;
  accountId!:number
  year!:number
  month!:number
  bankStatementId!:number;
  isByMonth:any
  isByUpload = true;
  labelByUpload = "";
  modalHeadingUpload = "";
  constructor(
    private dataService: DataService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.activatedRoute.params.subscribe(params =>{
      this.accountId= parseInt(params['id']) 
      if(params['year']){
        this.isByMonth=true
      }
      
      this.year= parseInt(params['year'])
      this.month= parseInt(params['month'])
      this.bankStatementId= parseInt(params['id'])
    
    })
  }
  
  labelByMonth = ""
  modalHeading = ""

  getData(refresh: boolean) {
    this.dataService
      .getLookupData(
       webApi.bankStatementByMonth+"/" +
          this.accountId +
          "/" +
          this.year +
          "/" +
          this.month,
        true
      )
      .subscribe((result: any) => {
        //These lookups mustn't be cached
        this.subHeading =
          result.accountName +
          " - " +
          this.labelByMonth +
          ": " +
          result.formattedMonth;
        this.orderBy(result.items);
        this.showVatColumns = result.showVatColumns;
      });
  }

  orderBy(data:any) {
    this.data = data.sort((a: any, b:any) => {
      return Number(new Date(a.datePosted)) - Number(new Date(b.datePosted));
    });
  }

  print(accountId:any, year:any, month:any) {
    this.dataService.getReport(webApi.bankStatementByMonthPDF+'/' + this.accountId + '/' + this.year + '/' + this.month).then((dataUrl:any) => {
          this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
      });
  }

  initTranslation() {
    this.translateService.setDefaultLang("en");
    this.translateService.use("en");
    this.translateService
      .get(
        "resources.finance-bankaccounts-bankstatementbymonthdetail-label-bymonth"
      )
      .subscribe((msg: any) => {
        this.labelByMonth = msg;
      });
    this.translateService
      .get(
        "resources.finance-bankaccounts-bankstatementbyuploaddetail-label-byupload"
      )
      .subscribe((msg: any) => {
        this.labelByUpload = msg;
      });

    this.translateService
      .get(
        "resources.finance-bankaccounts-bankstatementbymonthdetail-pdfmodal-header-bankstatementallocationsbymonth"
      )
      .subscribe((msg: any) => {
        this.modalHeading = msg;
      });

    this.translateService
      .get(
        "resources.finance-bankaccounts-bankstatementbyuploaddetail-pdfmodal-header-bankstatementallocationsbyupload"
      )
      .subscribe((msg: any) => {
        this.modalHeadingUpload = msg;
      });
  }


  ngOnInit() {
    this.initTranslation()
    if(this.isByMonth){
      this.getData(true)
    }
    else{
      this.getUploadData(true)
    }
    
  }


  getUploadData(refresh:boolean) {
     this.dataService.getLookupData(webApi.bankStatementByUpload+'/'+ this.bankStatementId, true).subscribe((result:any) => {//These lookups mustn't be cached
          this.subHeading = result.accountName + ' - ' + this.labelByUpload + ': ' + result.uploadName
          this.data = result.items
          this.showVatColumns = result.showVatColumns
      })
  }

  printUpload(bankStatementId:any) {
      this.dataService.getReport(webApi.bankStatementByUploadPDF + '/' + this.bankStatementId).then((dataUrl:any) => {
          this.modalService.openPdfReportModal(this.modalHeadingUpload, dataUrl);
      })
  }


}
