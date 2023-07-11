import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, api, searchUIOptions,resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";


@Component({
  selector: "web-query",
  templateUrl: "./query.component.html",
  styleUrls: ["./query.component.css"],
})
export class QueryComponent {
  constructor(){}

  exportButton = false;
  pdfButton = true;
  addNewButton = false;
  refreshButton = true;
  title = 'resources.accountant-query-pageheading-askmyaccountant';
  addURL = '/accountant/customledgeraccounts/add';
  helpLinkURL = webConstants.queryHelpUrl;
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: false,
    dateRange: false
   };
   resourceMessages : resourceMessages = {
   tableSearchPlaceHolder:'resources.accountant-query-searchplaceholder',
   PDFModalHeading: "resources.accountant-incomestatement-pdfmodal-header-askmyaccountantreport",

   }

   queryColumns: Column[] = [
    { columnDef: 'id', header: 'resources.accountant-query-tablecolumnheading-no'},
    { columnDef: 'reportingDate', header: 'resources.accountant-query-tablecolumnheading-date',showDateFilter:true},
    { columnDef: 'reference', header: 'resources.accountant-query-tablecolumnheading-reference' },
    { columnDef: 'source', header: 'resources.accountant-query-tablecolumnheading-source' },
    { columnDef: 'amount', header: 'resources.accountant-query-tablecolumnheading-amount',pullRight:true },

  ];

  api: api = {
    get: webApi.queryAccountant,
    pdf : webApi.pdfQuery
  };
}
