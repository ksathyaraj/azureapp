import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { Column, ColumnType, api, searchUIOptions, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";

@Component({
  selector: "admin-pending-payment-subscriptions",
  templateUrl: "./pending-payment-subscriptions.component.html",

})
export class PendingPaymentSubscriptionsComponent {
  constructor(private router: Router){}
  title = 'Pending Payment Subscriptions';
  updateURL = '/companies/company-';
  paymentColumns: Column[] = [
  {
  columnDef: 'daysSincePayment', header: 'Days Since Payment',},
  { columnDef: 'paymentDate', header: 'Payment Date',showDateFilter:true},
  { columnDef: 'companyLoginName', header: 'Company Name',columnType: ColumnType.link},
  { columnDef: 'start', header: 'Subscription Start',showDateFilter:true},
  { columnDef: 'paymentType', header: 'Payment Type'},
  { columnDef: 'countryImageUrl',colWidth:"1%", header: 'Country',showDateFilter:true ,columnType: ColumnType.image,columnDefTitle: 'countryName'},
    {
      columnDef: '', header: 'Actions', updatePayment: ColumnType.updatePayment, activePendingPayment: ColumnType.activePendingPayment, suspendPendingPayment: ColumnType.suspendPendingPayment, hideSorting: true,
      ngClassCondition: (dataValue: any,type: number) => { return dataValue['isPendingPesaPalPayment'] && type == 13 ? true : dataValue['showActivateSubscriptionLink'] && type == 14 ? true : dataValue['showSuspendSubscriptionLink'] && type == 15 ? true : false }, transparentBtn: true

    }
  ];
  api: api = {
    get: webPortal.pendingpaymentsreport,
  };
   searchUIOptions: searchUIOptions = {
     searchInput: true,
   };
  
  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder:"search company or country ..."
  };
  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+param.id);
  }
  
}
