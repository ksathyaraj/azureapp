import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Enumerable from "linq";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { searchUIOptions, Column, api, tabData, resourceMessages, dropDownFilter } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";

@Component({
  selector: "web-supplier-invoices-owed",
  templateUrl: "./supplier-invoices-owed.component.html",
})
export class SupplierInvoicesOwedComponent {
  constructor(private router: Router, private dateService : DateService, private dataService: DataService,) { }
  suppliers = [];
  selectedSupplierId = "";
  isLoaded = false;
  exportButton = true;
  pdfButton = true;
  addNewButton = false;
  title = 'resources.reports-supplierinvoicesowed-pageheading-supplierinvoicesowed';
  helpLinkUrl = webConstants.supplierInvoiceOwedHelpUrl;

  supplierColumns: Column[] = [
    { columnDef: 'dateFinalized', header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-createddate',showDateFilter: true},
    { columnDef: 'dueDate', header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-duedate',showDateFilter: true},
    { columnDef: 'supplier', header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-supplier' },
    { columnDef: 'description', header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-reference' },
    { columnDef: 'amount', header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-amount',pullRight: true, showDecimalFilter:true },
  ];
  totalColumn = [
    { header: 'resources.reports-supplierinvoicesowed-tablecolumnheading-totalamount', colspan: 4},
     { columnDef: 'totalAmount', showDecimalFilter: true, pullRight:true }
];

  api: api = {
    getWithDateRange: webApi.supplierInvoicesOwed,
    pdf: webApi.exportSupplierInvoiceOwedPdf,
    export: webApi.exportSupplierInvoiceOwedCsv,
    exportParams: { fromDate: '', toDate: '' },
    pdfParams: { fromDate: '', toDate: '' },
  };
   searchUIOptions: searchUIOptions = {
    searchInput: true,
    dateRange: true,
    dropdown: true,
    
   };
  
    dropDownFilter:dropDownFilter = {
    smOptions: this.suppliers,
    smRequired: false,
    smLabel: 'resources.reports-supplierinvoicesowed-label-supplier',
    smOptionDisplayField: 'value',
    smOptionValueField: 'key',
    smPlaceholder: 'resources.reports-supplierinvoicesowed-select-placeholder-allsuppliers',
    smLabelClass: 'col-md-2',
    selectedSearchFilterDropdown:this.selectedSupplierId,
    getDataByValue: 'selectedSupplierId',
    
  }

  additionalGetPageResponse = 'supplierInvoicesOwedItemViewModels';
  
    tabData: tabData[] = [
    {routerLink: '/reports/supplierinvoicesowed', header: 'resources.reports-supplierinvoicesowed-tabheading-supplierinvoicesowed', isActive: true},
    {routerLink: '/reports/supplierageanalysis', header: 'resources.reports-supplierageanalysis-tabheading-supplierageanalysis', }
  ];
  resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.reports-supplierinvoicesowed-pdfmodal-header-supplierinvoicesowed",
    tableSearchPlaceHolder:"resources.reports-supplierinvoicesowed-supplierinvoicesowed-searchplaceholder"
  };

  ngOnInit() {
    this.getData(true);
  }
  getData(refresh: boolean) { 
    this.dataService.getLookupData(webApi.getSuppliers, refresh).subscribe((response: any) => {
      this.suppliers = response;
      this.dropDownFilter.smOptions = response;
    });
  }
}
