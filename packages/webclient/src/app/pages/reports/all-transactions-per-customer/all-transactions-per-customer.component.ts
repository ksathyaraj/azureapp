import { Component, OnInit } from "@angular/core";
import { Column, DateFilter, api, dataOperation, resourceMessages} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";


@Component({
  selector: "web-all-transactions-per-customer",
  templateUrl: "./all-transactions-per-customer.component.html",
})
export class AllTransactionsPerCustomerComponent implements OnInit {
  constructor(private dataService: DataService, private dateService: DateService){}
  title="resources.reports-customerinvoicesdue-header"
  helpLinkURL = 'https://support.smeasy.co.za/enza/videos/whoowesuspercustomerreport';
  customers: any;
  requestGLButton = false;
  exportButton = true;
  pdfButton = true;
  refreshButton = true;
  addNewButton = false;
  showTitleBar = true;
  placeholderValue = 'resources.reports-customerinvoices-select-placeholder-allcustomers';
  customersPlaceHolder = 'resources.reports-customerinvoices-select-placeholder-allcustomers';
  filterFn: any = "";
  getWithDateRangeApi = '';
  customerInvoices:any;
  additionalGetPageResponse = '';
  fromDate:any; 
  toDate:any;
  customerId:any;
  dateFilter:DateFilter = {
    smLabel: ''
  }
  selectedCustomer='';
  filterColumn = "";
  dataOperations: dataOperation = {
    sortPredicate: this.filterColumn,
    sortOrder: true,
    paging: {
      pageSize: 10,
      currentPage: 1,
      maxPagesToShow: 5
    },
  };
  blockquote = "resources.reports-customerinvoicesduebycustomer-paragraph-blockquote";

   customerInvoiceColumns : Column[] =[   
    {columnDef:'invoiceDate',header:'resources.reports-customerinvoicesdue-tablecolumnheading-invoicedate',showDateFilter:true},
    {columnDef:'details',header:'resources.reports-customerinvoicesdue-tablecolumnheading-company'},
    {columnDef:'currencyFormattedAmount',header:'resources.reports-customerinvoicesdue-tablecolumnheading-amount',"pullRight":true},
];
   tabData =[
    {routerLink: '/reports/customerinvoicesdue', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesdue'},
    {routerLink: '/reports/customerinvoicesduebycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesduebycustomer',isActive:true},
    {routerLink: '/reports/customerageanalysis', header: 'resources.reports-customerageanalysis-tabheading-customerageanalysis'},
    {routerLink: '/reports/customerstatementbycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerstatementbycustomer'},
  ]

   resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.reports-customerinvoicesdue-pdfmodal-header-customerinvoicesdue",
    tableSearchPlaceHolder :'resources.reports-customerinvoicesduebycustomer-label-customer',
    noTableDataMessage: "resources.common-noitemsfound"

  };

  api: api = {
    dateRangeFilter: {startDate: '',endDate:'' },
    export : webApi.exportCustomerInvoicesDueByCustomerCsv,
    exportParams: { startDate: '', endDate: '', CustomerId:'' },
    pdf : webApi.pdfCustomerInvoicesDueByCustomer,
    pdfParams: { startDate: '', endDate: '', CustomerId:'' },
  };

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];

today = new Date();
currentDate = this.today.getDate() + ' ' + this.monthNames[this.today.getMonth()] + ' ' + this.today.getFullYear();
ngOnInit(){
  this.getWithDateRangeApi = webApi.getCustomerInvoicesDueByCustomerData;
  this.getInvoiceData(this.dataOperations, this.filterFn)
  this.dataService.getLookupData(webApi.invoiceablecontactsFiltered, true).subscribe((data: any) => {
    this.customers = data;
  })
  
}
  getInvoiceData(dataOperations: dataOperation, filterFn: any) {
    let paramValues: any = {};
    if(this.getWithDateRangeApi !== '') {
        paramValues = this.api.dateRangeFilter;
        if(this.customerId){
          paramValues={ ...this.api.dateRangeFilter,CustomerId: this.customerId}
        }
    }
    this.dataService.getData(this.getWithDateRangeApi,true,dataOperations,filterFn,this.additionalGetPageResponse,paramValues)
      .subscribe((data:any)=>{
        this.customerInvoices=data.allData
      })
}

handleRefreshButtonClick() {
  this.getInvoiceData(this.dataOperations, this.filterFn)
}


handleSearch(event: any) {
  this.customerId=event.id;
  this.api.pdfParams[Object.keys(this.api.pdfParams)[2]] = this.customerId;
  this.api.exportParams[Object.keys(this.api.exportParams)[2]] = this.customerId;
  const paramValues={ ...this.api.dateRangeFilter,CustomerId: event.id}
  this.dataService.getData(this.getWithDateRangeApi,true,this.dataOperations,this.filterFn,this.additionalGetPageResponse,paramValues)
  .subscribe((data:any)=>{
    this.customerInvoices=data.allData
  })
}

onSearchByDateRange(){
  const params = {
    fromDate: this.fromDate,
    toDate: this.toDate
  }
  this.searchByDateRange(params);
}
searchByDateRange(event:any){
    if(this.api.dateRangeFilter !== undefined) {
      this.api.dateRangeFilter[Object.keys(this.api.dateRangeFilter)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.dateRangeFilter[Object.keys(this.api.dateRangeFilter)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
    }
    if(this.api.pdfParams !== undefined) {
      this.api.pdfParams[Object.keys(this.api.pdfParams)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.pdfParams[Object.keys(this.api.pdfParams)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
      this.api.pdfParams[Object.keys(this.api.pdfParams)[2]] = this.customerId;
    }
    if(this.api.exportParams !== undefined) {
      this.api.exportParams[Object.keys(this.api.exportParams)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.exportParams[Object.keys(this.api.exportParams)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
      this.api.exportParams[Object.keys(this.api.exportParams)[2]] = this.customerId;
    }
}
}
