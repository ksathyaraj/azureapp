import { Component } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { Router } from '@angular/router';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';
import { DateService } from 'packages/shared-lib/src/lib/services/date.service';
import { ModalService } from 'packages/shared-lib/src/lib/services/modal.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "web-price-list",
  templateUrl: "./price-list.component.html",
})
export class PriceListComponent {
  constructor(private dataService:DataService,private dateService:DateService, private router: Router,private translateService:TranslateService,private modalService:ModalService) {
  }
  deleteModalWithData = 'code'
  helpLinkURL = webConstants.pricelistVideoURL;
  addURL = 'finance/quotes/pricelist/0';
  updateURL = 'finance/quotes/pricelist'
  quotePrefix = '';
  exportButton = true;
  vatInfo:any;
  isVatRegistered = false;
  companyProfile:any;
  showVatChangeBanner=false;
  modalHeading=""
  ngOnInit(){
    this.activate();
  }
  organisationColumns: Column[] = [
    { columnDef: 'name', header: 'Product', columnType: ColumnType.link},
    { columnDef: 'displayDescription', header: 'Description'},
    { columnDef: 'code', header: 'Code'},
    { columnDef: this.isVatRegistered?'exclusiveAmount':'total', header: 'List Price' , showDecimalFilter:true},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];
  api: api = {
    get: webApi.pricelist,
    deleteForHttpPostMethod: webApi.deletePricelist,
    export: webApi.exportPricelist,
    pdf: webApi.exportPdfPricelist
    
  };
  title = 'resources.finance-invoicing-pricelist-pageheading-pricelist';

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage:"resources.finance-quotes-pricelist-warningmessage",
    deleteSuccessMessage: "resources.finance-quotes-pricelist-deletesuccessmessage",
    confirmDeleteMessage: "resources.finance-quotes-pricelist-deleteconfirmmessage",
    PDFModalHeading:"resources.finance-pricelist-pdfmodal-header-pricelistreport",
    tableSearchPlaceHolder:"resources.finance-invoicing-pricelist-searchplaceholder"
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
  print () {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.finance-pricelist-pdfmodal-header-pricelistreport').subscribe((msg)=> {
        this.modalHeading = msg;
        this.dataService.getReport(webApi.exportPdfPricelist).then((dataUrl)=> {
           console.log(this.modalHeading,dataUrl);
            this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
        });
    });
  }
  getVATDetails () {
    this.dataService.getLookupData(webApi.getVatInfoFilePath, true).subscribe( (responses:any)=> {
        this.vatInfo = responses;
        this.isVatRegistered = this.vatInfo.isVatRegistered;
    });
  }
  vatChangeCheck() {
    if (!this.dateService.isVatChangeDate()) return;

    this.dataService.getLookupData(webApi.comapnyProfile, true).subscribe ((response:any)=> {
        this.companyProfile = response;

        if (this.companyProfile.showVat && this.companyProfile.showVatChangeOverStatusButton) {
            this.showVatChangeBanner = true;
        } else {
            this.showVatChangeBanner = false;
        }
    });
  }
  // showVatChangeModal () {
  //   //Pop up modal for the Vat Change Over Status Modal
  //   this.modalService.priceListVatChangeOverStatusModal().result.subscribe(
  //       ()=> {
  //           this.vatChangeCheck();
  //           // getData(true);
  //       }
  // )}
  activate() {
    this.vatChangeCheck();
    this.getVATDetails();
  }

  
}
