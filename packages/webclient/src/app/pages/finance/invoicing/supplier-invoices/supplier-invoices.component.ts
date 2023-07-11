import { Component, OnInit } from '@angular/core';
import { Column, ColumnType, api, resourceMessages, searchUIOptions, tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants }  from 'packages/shared-lib/src/lib/constants/web.constants';
import { Router } from '@angular/router';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';

@Component({
  selector: "web-supplier-invoices",
  templateUrl: "./supplier-invoices.component.html"
})
export class SupplierInvoicesComponent implements OnInit{

  constructor(private router: Router, private dataService: DataService) {
  }

  helpLinkURL = webConstants.supplierInvoiceHelpURL;
  addURL = 'finance/invoicing/supplierinvoices/0';
  updateURL = 'finance/invoicing/supplierinvoices';
  supplierInvoiceColumns: Column[] = [
    { columnDef: 'invoiceNumber', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-invoicenumber', columnType: ColumnType.link},
    { columnDef: 'company', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-company'},
    { columnDef: 'date', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-date', showDateFilter: true},
    { columnDef: 'totalAmount', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-amount', pullRight: true},
    { columnDef: 'totalVat', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-vat', columnOptionalCondition: (dataValue:any) => {return this.showVat;}, showDecimalFilter: true, pullRight: true},
    { columnDef: 'total', header: 'resources.finance-invoicing-supplierinvoice-tablecolumnheading-total', pullRight: true},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];
  api: api = {
    getWithDateRange: webApi.getSupplierInvoices,
    deleteForHttpPostMethod: webApi.deleteSupplierInvoice
  };
  title = 'resources.finance-invoicing-supplierinvoice-pageheading-supplierinvoices';
  showVat = false;
  
  searchUIOptions: searchUIOptions = {
    dateRange: true,
    searchInput: true,
    alphabetFilter: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-invoicing-supplierinvoice-warningmessage',
    deleteSuccessMessage: 'resources.finance-invoicing-supplierinvoices-deletesuccessmessage',
    confirmDeleteMessage: 'resources.finance-invoicing-supplierinvoices-deleteconfirmmessage',
    tableSearchPlaceHolder: 'resources.finance-invoicing-supplierinvoice-searchplaceholder'
  };
  dataLoaded = false;

  ngOnInit() {
    this.getVatInfo();
  }

  getVatInfo() {
    this.dataService
      .getLookupData(webApi.getVatInfo, true)
      .subscribe((data: any) => {
        this.dataLoaded = true;
        this.showVat = data.showVat;
      });
  }

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
}
