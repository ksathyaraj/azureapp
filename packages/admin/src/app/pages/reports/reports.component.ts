import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "admin-reports",
  templateUrl: "./reports.component.html",
})
export class ReportsComponent {
   navButtonList: navButtonGrid[] = [
    {
    text: 'ACTIVE COMPANIES',
    subText:'Currently Active Companies by Type & Country',
    sref: '/reports/activesubscriptions'
    },
    {
      text: 'WIZARD REPORT',
      subText:'Havent run through wizard',
      sref: '/reports/wizardreport'
    },
    {
      text: 'INACTIVE USERS',
      subText:'Havent logged in for more than 30 days',
      sref: '/reports/inactiveusersreport'
    },
    {
      text: 'NO DATA CAPTURED',
      subText:'Companies that have not captured any data',
      sref: '/reports/nodatacapturedreport'
    },
    {
      text: 'KPI 9',
      subText:'churn (deactivators)',
      sref: '/reports/kpi9'
     },
    {
      text: 'KPI 10',
      subText:'free trial signups',
      sref: '/reports/kpi10'
     },
    {
      text: 'KPI 11',
      subText:'conversions',
      sref: '/reports/kpi11'
     },
    {
      text: 'ACTIVE VOUCHERS',
      subText:'Currently Active Companies by Type & Country',
      sref: '/reports/activevouchersubscriptions'
     },
    {
      text: 'PAYING VOUCHERS',
      sref: '/reports/payingvouchersreport'
     },
    {
      text: 'LOGO REPORT',
      sref: '/reports/logoreport'
     },
    {
      text: 'LAST LOGGED IN REPORT',
      sref: '/reports/lastloggedinreport'
     },
    {
      text: 'Expiring SUBSCRIPTIONS',
      sref: '/reports/subscriptionsendingsoon'
     },
    {
      text: 'PENDING PAYMENTS',
      sref: '/reports/pendingpaymentssubscriptions'
     },
    {
      text: 'COMMAND AUDIT TYPES',
      subText:'Command Audit by Type',
      sref: '/reports/commandtypeaudits'
     },
    {
      text: 'USAGE REPORT',
      subText:'Usage Report of System functions',
      sref: '/reports/usagereport'
     },
    {
    text: 'CREDIT CARD REPORT',
      subText:'Companies who paid by credit card',
      sref: '/reports/creditcardsignup'
     },
    {
      text: 'EFT REPORT',
      subText:'Companies who paid by electronic fund transfer',
      sref: '/reports/electronicfundstransfer'
     },
    {
      text: 'DEBIT ORDER REPORT',
      subText:'Companies who paid by debit orders',
      sref: '/reports/debitorderreport'
     },
  ]
}
