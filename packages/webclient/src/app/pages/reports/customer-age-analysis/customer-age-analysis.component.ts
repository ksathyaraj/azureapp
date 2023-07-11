import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { tabData,Column,ColumnType,api,resourceMessages,searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
@Component({
  selector: "web-customer-age-analysis",
  templateUrl: "./customer-age-analysis.component.html",
  styleUrls: ["./customer-age-analysis.component.css"],
})
export class CustomerAgeAnalysisComponent {
   exportButton = true;
   pdfButton = true;
   refreshButton = true;
   addNewButton = false;
   helpLinkURL = webConstants.customerAgeAnalysisHelpUrl;
   title ="resources.reports-customerinvoicesdue-header";
   blockquote="resources.reports-customerageanalysis-paragraph-blockquote";
   

   tabData : tabData[] = [
     {routerLink: '/reports/customerinvoicesdue', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesdue'},
     {routerLink: '/reports/customerinvoicesduebycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesduebycustomer'},
     {routerLink: '/reports/customerageanalysis', header: 'resources.reports-customerageanalysis-tabheading-customerageanalysis',isActive:true},
     {routerLink: '/reports/customerstatementbycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerstatementbycustomer'},
  ]
  customerColumns: Column[] = [
    { columnDef: 'customer', header: 'Customer'},
    { columnDef: 'current', header: 'Current',showDecimalFilter:true, pullRight: true},
    { columnDef: 'thirtyDays', header: '30 days',showDecimalFilter:true, pullRight: true},
    { columnDef: 'sixtyDays', header: '60 days',showDecimalFilter:true, pullRight: true},
    { columnDef: 'ninetyDays', header: '90 days & over',showDecimalFilter:true, pullRight: true},
    { columnDef: 'total', header: 'Total',showDecimalFilter:true, pullRight: true},

  ];
  totalColumn = [
    { header: 'resources.reports-customerageanalysis-tablecolumnheading-total'},
    { columnDef: 'currentTotal',showDecimalFilter:true, pullRight: true},
    { columnDef: 'thirtyDaysTotal',showDecimalFilter:true, pullRight: true },
    { columnDef: 'sixtyDaysTotal',showDecimalFilter:true, pullRight: true },
    { columnDef: 'ninetyDaysTotal',showDecimalFilter:true, pullRight: true},
    { columnDef: 'total',showDecimalFilter:true, pullRight: true}
];
  additionalGetPageResponse = 'customerAgeAnalysisItemPdfModels';
  dateFilter = {
      smLabel: 'resources.reports-customerageanalysis-tabheading-customerageanalysis-label-selectdateforageanalysis',
      smPlaceholder :'DD/MM/YY e.g.24/05/2023',
      smLabelclass :'col-md-5'
    }

  api: api = {
    getWithSingleDate : webApi.getCustomerData,
    singleDateFilter: {datePeriod: '' },
    export : webApi.exportAgeAnalysisCsv,
    exportParams : {datePeriod: '' },
    pdf : webApi.exportAgeAnalysisPdf,
    pdfParams : {datePeriod: '' },
  };


  resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.reports-customerageanalysis-pdfmodal-header-customeragenalysis",
  };

  searchUIOptions:searchUIOptions ={
    singleDateFilter : true
  };

}
