import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, api, resourceMessages, searchUIOptions, tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";

@Component({
  selector: "web-custom-ledger-accounts",
  templateUrl: "./custom-ledger-accounts.component.html",
})
export class CustomLedgerAccountsComponent {
  constructor(private router: Router, private dateService : DateService) { }

  exportButton = false;
  pdfButton = false;
  addNewButton = true;
  title = 'resources.accountant-customledgeraccounts-pageheading-customledgeraccounts';
  addURL = '/accountant/customledgeraccounts/add';
  supportVideoUrl = webConstants.customLedgerAccountHelpUrl;
  ledgerColumns: Column[] = [
    { columnDef: 'displayName', header: 'resources.accountant-customledgeraccounts-add-label-displayname'},
    { columnDef: 'accountType', header: 'resources.accountant-customledgeraccounts-add-label-accounttype'},
    { columnDef: 'reportingCategory', header: 'resources.accountant-customledgeraccounts-tablecolumnheading-reportingcategory' },
    { columnDef: 'reportingSubCategory', header: 'resources.accountant-customledgeraccounts-tablecolumnheading-reportingsubcategory' },
  ];

  api: api = {
    get: webApi.customledgeraccounts,
  };
   searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: false,
    dateRange: false
   };
  
  tabData: tabData[] = [];

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }
  resourceMessages : resourceMessages = {
   tableSearchPlaceHolder:'resources.accountant-customledgeraccounts-searchplaceholder',
   }
}

