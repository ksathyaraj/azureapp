import { Component } from "@angular/core";
import { Column,api,searchUIOptions,resourceMessages, dropDownFilter } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";

@Component({
  selector: "admin-recon-report",
  templateUrl: "./recon-report.component.html"
})
export class ReconReportComponent {

  constructor(private dataService : DataService,
    private dateService : DateService){}

  ngOnInit() {
    this.getAbsaBatchIndicators();  
  }
  title = "Absa Batch Recon Report";
  batchIndicators:any ="";
  selectedBatch:any ="";
  batchArray:any ="";

  absaBatchReconReportColumns: Column[] = [
    {columnDef: 'batch', header: 'Batch' },
    {columnDef: 'cif', header: 'CIF' },
    {columnDef: 'country', header: 'Country' },
    {columnDef: 'accountName', header: 'Account Name' },
    {columnDef: 'tradingName', header: 'Trading Name' },
    {columnDef: 'entityType', header: 'Entity Type' },
    {columnDef: 'vatRegistered', header: 'VAT Registered' },
    {columnDef: 'fullName', header: 'Full Name' },
    {columnDef: 'cellphoneNo', header: 'Cellphone No' },
    {columnDef: 'email', header: 'Email Address' },
    {columnDef: 'sanitizedName', header: 'Company Login Name' },
    {columnDef: 'username', header: 'Username' },
    {columnDef: 'registered', header: 'Registered' },
    {columnDef: 'accountNumber', header: 'Account Number' },
    {columnDef: 'applicationNumber', header: 'Application Number' },
    {columnDef: 'voucherCode', header: 'Voucher Code' },
    {columnDef: 'companyId', header: 'CompanyID' }
  ]

  api: api = {
    getWithDateRange: webPortal.getAbsaBatchRecon,
    dropDownFilter: {batchIndicator:""}   
  };

  getAbsaBatchIndicators() {
    this.dataService.getLookupData(webPortal.getAbsaBatchIndicators)
      .subscribe((result: any) => {
         this.batchArray = result.map((item:any, index:any)=>{
          const batchObject = {
            id :index,
            value:item
          }
          return batchObject;
        })
        this.batchIndicators = this.batchArray;
        this.dropDownFilter.smOptions = this.batchIndicators;
    });
  }
  dropDownFilter: dropDownFilter = {
    smOptions: this.batchIndicators,
    smRequired: false,
    smOptionDisplayField: 'value',
    smOptionValueField: '',
    smPlaceholder: "Please select a batch indicator",
    smLabelClass: "col-md-2",
    selectedSearchFilterDropdown: this.selectedBatch,
    smLabel:''
  };

 
  searchUIOptions: searchUIOptions = {
    dateRange: true,
    dropdown: true
    };

  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
  };

  downloadData(){
    const from = this.dateService.getDefaultFromDate();
    const to = this.dateService.getDefaultToDate();

    const paramFilters: any = {};
    paramFilters.from = this.dateService.getFormattedDateForWebApi(from);
    paramFilters.to = this.dateService.getFormattedDateForWebApi(to);
    paramFilters.batchIndicator = this.batchIndicators; 
    return this.dataService.getReportWithParams(webPortal.downloadAbsaCompanies, paramFilters).then((url: any) => {
      window.open(url, '_blank', '');
    });
  }
  
 
}

