import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column,api,searchUIOptions,resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "web-customer-invoice-due-by-date",
  templateUrl: "./customer-invoice-due-by-date.component.html",
  styleUrls: ["./customer-invoice-due-by-date.component.css"],
})
export class CustomerInvoiceDueByDateComponent {
  
  
  title="resources.reports-customerinvoicesdue-header";
  helpLinkUrl =webConstants.customerInvoiceHelpUrl;
  tabData =[
    {routerLink: '/reports/customerinvoicesdue', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesdue',isActive:true},
    {routerLink: '/reports/customerinvoicesduebycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesduebycustomer'},
    {routerLink: '/reports/customerageanalysis', header: 'resources.reports-customerageanalysis-tabheading-customerageanalysis'},
    {routerLink: '/reports/customerstatementbycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerstatementbycustomer'},
  ]
  customerInvoiceColumns : Column[] =[
        {columnDef:'invoiceNumber',header:'resources.reports-customerinvoicesdue-tablecolumnheading-invoicenumber'},
        {columnDef:'company',header:'resources.reports-customerinvoicesdue-tablecolumnheading-company'},
        {columnDef:'invoiceDate',header:'resources.reports-customerinvoicesdue-tablecolumnheading-invoicedate',showDateFilter:true},
        {columnDef:'currencyFormattedAmount',header:'resources.reports-customerinvoicesdue-tablecolumnheading-amount',"pullRight":true},
        {columnDef:'currencyFormattedAmountOutstanding',header:'resources.reports-customerinvoicesdue-tablecolumnheading-amountoutstanding',"pullRight":true},
  ];
  totalColumn=[
    { header: 'resources.reports-customerinvoicesdue-tablecolumnheading-totalamount', colspan:3},
    { columnDef: 'totalReportingTotal',showDecimalFilter: true,"pullRight":true},
    { columnDef: 'totalReportingTotalOutstanding', showDecimalFilter: true,"pullRight":true}
  ]
  
  api: api = {
    getWithDateRange : webApi.getCustomerInvoicesDueData,
    dateRangeFilter: {startDate: '',endDate:'' },

    export : webApi.exportCustomerInvoicesDueCsv,
    exportParams: { startDate: '', endDate: '' },
    pdf : webApi.pdfCustomerInvoicesDue,
    pdfParams: { startDate: '', endDate: '' },
  };

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    dateRange: true,    
   };
  resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.reports-customerinvoicesdue-pdfmodal-header-customerinvoicesdue",
    tableSearchPlaceHolder :'resources.reports-customerinvoicesdue-customerinvoicesdue-searchplaceholder',
    noTableDataMessage: "resources.common-noitemsfound"

  };
  blockquote ='resources.reports-customerinvoicesdue-paragraph-blockquote'
  additionalGetPageResponse = 'customerInvoicesDueReportItem'
}
