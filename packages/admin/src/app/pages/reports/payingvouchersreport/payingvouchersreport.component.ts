import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, ColumnType, api, searchUIOptions, resourceMessages, dropDownFilter } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";

@Component({
  selector: "admin-payingvouchersreport",
  templateUrl: "./payingvouchersreport.component.html",
})
export class PayingvouchersreportComponent {
  constructor(private router: Router) { }
  start = moment();
  exportButton = false;
  pdfButton = false;
  addNewButton = false;
  title = 'Vouchers Payment Details';
  updateURL = '/licensees/';

  resellerColumns: Column[] = [
    { columnDef: 'licensee', header: 'Licensee'},
    { columnDef: 'invoiceNumber', header: 'Invoice Number',columnType: ColumnType.link},
    { columnDef: 'numberOfVouchers', header: 'Number of Licenses'},
    { columnDef: 'numberOfRedeemedVouchers', header: 'Redeemed Licenses'},
    { columnDef: 'issuedDate', header: 'Date Issued',showDateTimeFilter:true},
    { columnDef: 'paymentStartDate', header: 'Payment start date',showDateFilter:true },
    { columnDef: 'paymentEndDate', header: 'Payment end date',showDateFilter:true },
  ];

  api: api = {
    getWithSingleDate: webPortal.paymentVouchersReport,
    singleDateFilter: { paymentStartDate: ''},
  };

  searchUIOptions: searchUIOptions = {
     searchInput: false,
     singleDateFilter: true,
     dropdown: false
   };
  
  dateFilter = {
      smLabel: 'From',
      smPlaceholder :'DD/MM/YY e.g.24/05/2023',
      smLabelclass :'col-sm-3'
  }
  
  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.data.licenseeId+'/'+ param.data.invoiceNumber); // TODO - the page is being redirected but not with the selected dates.
  }
}
