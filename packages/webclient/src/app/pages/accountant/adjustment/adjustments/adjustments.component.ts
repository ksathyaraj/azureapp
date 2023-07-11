import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, ColumnType, api, tabData, searchUIOptions, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";

@Component({
  selector: "web-adjustments",
  templateUrl: "./adjustments.component.html",
})
export class AdjustmentsComponent {
 constructor(
  private modalService: ModalService,
  private router:Router,
 ) { }
 addURL = '/accountant/adjustments/add';
  helpLinkUrl = webConstants.adjustmentHelpUrl;
  exportButton = false;
  pdfButton = true;
  organisationColumns: Column[] = [
    { columnDef: 'reportingDate', header: 'resources.accountant-adjustments-tablecolumnheading-date',showDateFilter: true  },
    { columnDef: 'debitedLedgerAccount', header: 'resources.accountant-adjustments-tablecolumnheading-debitedledger' },
    { columnDef: 'debitReference', header: 'resources.accountant-adjustments-tablecolumnheading-reference' },
    { columnDef: 'creditLedgerAccount', header: 'resources.accountant-adjustments-tablecolumnheading-creditedledger' },
    { columnDef: 'creditReference', header: 'resources.accountant-adjustments-tablecolumnheading-reference' },
    { columnDef: 'amount', header: 'resources.accountant-adjustments-tablecolumnheading-amount', showDecimalFilter:true },

  ]

    api: api = {
    get: webApi.adjustments,
    pdf: webApi.PDFAdjustments,
    };
  
    title = 'resources.accountant-adjustments-pageheading-adjustments';

  tabData: tabData[] = [];
  searchUIOptions: searchUIOptions = {
    searchInput: true,
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-invoicing-supplierinvoice-warningmessage',
    tableSearchPlaceHolder: 'resources.accountant-adjustments-searchplaceholder',
    PDFModalHeading: 'resources.accountant-adjustments-pdfmodal-header-adjustmentsreport'
  };
 handleAddButtonClick(event: Event){
      this.router.navigateByUrl(this.addURL);
  }
}

