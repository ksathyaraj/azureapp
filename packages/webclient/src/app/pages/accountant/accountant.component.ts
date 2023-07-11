import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-accountant",
  templateUrl: "./accountant.component.html",
  styleUrls: ["./accountant.component.css"],
})
export class AccountantComponent {
  constructor(
    private enumService: EnumsService
){}

  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-accountant-generalledger',
      sref: '/accountant/generalledger',
      buttonSupportName: this.enumService.dashboardButtons.AccountantGeneralLedger
    },
    {
      text:'resources.dashboard-accountant-trialbalance',
      sref: '/accountant/trialbalance',
      buttonSupportName: this.enumService.dashboardButtons.AccountantTrialBalance
    },
    {
      text:'resources.dashboard-accountant-exportdata',
      sref: '/accountant/exportdata',
      buttonSupportName: this.enumService.dashboardButtons.AccountantExportData
    },
    {
      text:'resources.dashboard-accountant-incomestatement',
      subText:'resources.dashboard-accountant-incomestatement-profitorloss',
      sref: '/accountant/incomestatement',
      buttonSupportName: this.enumService.dashboardButtons.AccountantIncomeStatement
    },
    {
      text:'resources.dashboard-accountant-balancesheet',
      sref: '/accountant/balancesheet',
      buttonSupportName: this.enumService.dashboardButtons.AccountantBalanceSheet
    },
    {
      text:'resources.dashboard-accountant-adjustments',
      sref: '/accountant/adjustments',
      buttonSupportName: this.enumService.dashboardButtons.AccountantAdjustments
    },
    {
      text:'resources.dashboard-accountant-setup',
      subText:'resources.dashboard-accountant-setup-takeonbalances',
      sref: '/accountant/setup',
      buttonSupportName: this.enumService.dashboardButtons.AccountantSetup
    },
    {
      text:'resources.dashboard-accountant-query',
      subText:'resources.dashboard-accountant-query-askmyaccountant',
      sref: '/accountant/query',
      buttonSupportName: this.enumService.dashboardButtons.AccountantQuery
    },
    {
      text:'resources.dashboard-accountant-customledger',
      subText:'resources.dashboard-accountant-customledger-accounts',
      sref: '/accountant/customledgeraccounts',
      buttonSupportName: this.enumService.dashboardButtons.AccountantCustomLedger
    }
  ];
}
