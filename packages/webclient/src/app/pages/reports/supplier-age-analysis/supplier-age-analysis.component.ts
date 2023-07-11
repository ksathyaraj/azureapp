import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, api, resourceMessages, searchUIOptions, tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
@Component({
  selector: "web-supplier-age-analysis",
  templateUrl: "./supplier-age-analysis.component.html",
})
export class SupplierAgeAnalysisComponent {
selectedDate : any;
  constructor(private router: Router, private dateService : DateService) { }
  exportButton = true;
  pdfButton = true;
  addNewButton = false;
  refreshButton = true;
  title = 'resources.reports-supplierageanalysis-pageheading-supplierageanalysis';
  supportVideoBaseUrl = webConstants.supplierAgeAnalysisHelpURL;
  supplierColumns: Column[] = [
    { columnDef: 'supplier', header: 'resources.reports-supplierageanalysis-tablecolumnheading-supplier'},
    { columnDef: 'current', header: 'resources.reports-supplierageanalysis-tablecolumnheading-current',pullRight: true, showDecimalFilter:true},
    { columnDef: 'thirtyDays', header: 'resources.reports-supplierageanalysis-tablecolumnheading-30days',pullRight: true ,showDecimalFilter:true},
    { columnDef: 'sixtyDays', header: 'resources.reports-supplierageanalysis-tablecolumnheading-60days',pullRight: true ,showDecimalFilter:true},
    { columnDef: 'ninetyDays', header: 'resources.reports-supplierageanalysis-tablecolumnheading-90daysandover',pullRight: true,showDecimalFilter:true },
    { columnDef: 'total', header: 'resources.reports-supplierageanalysis-tablecolumnheading-total', pullRight: true,showDecimalFilter:true },  ];
  totalColumn = [
    { header: 'resources.reports-supplierageanalysis-tablecolumnheading-total'},
    { columnDef: 'currentTotal', showDecimalFilter: true, pullRight: true},
    { columnDef: 'thirtyDaysTotal', showDecimalFilter: true, pullRight: true},
    { columnDef: 'sixtyDaysTotal', showDecimalFilter: true, pullRight: true},
    { columnDef: 'ninetyDaysTotal', showDecimalFilter: true, pullRight: true},
    { columnDef: 'total', showDecimalFilter: true, pullRight: true }
];
  api: api = {
    getWithSingleDate: webApi.supplierAgeAnalysis,
    singleDateFilter:{datePeriod: '' },
    export : webApi.exportSupplierAgeAnalysisCsv,
    exportParams : {datePeriod: '' },
    pdf : webApi.exportSupplierAgeAnalysispdf,
    pdfParams : {datePeriod: '' },
    // get: webApi.bankingDetails,
  };
   searchUIOptions: searchUIOptions = {
    singleDateFilter : true
   };
  resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.reports-supplierageanalysis-pdfmodal-header-supplierageanalysis",
  };
  
    tabData: tabData[] = [
    {routerLink: '/reports/supplierinvoicesowed', header: 'resources.reports-supplierinvoicesowed-tabheading-supplierinvoicesowed', },
    {routerLink: '/reports/supplierageanalysis', header: 'resources.reports-supplierageanalysis-tabheading-supplierageanalysis',isActive: true }
    ];
  
  additionalGetPageResponse = 'supplierAgeAnalysisItemPdfModels';
  dateFilter = {
      smLabel: 'resources.reports-supplierageanalysis-tabheading-supplierageanalysis-label-selectdateforageanalysis',
      smPlaceholder :'DD/MM/YY e.g.24/05/2023',
      smLabelclass :'col-md-5'
  }
}
