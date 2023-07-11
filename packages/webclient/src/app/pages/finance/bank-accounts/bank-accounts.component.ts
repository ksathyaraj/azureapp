import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-bank-accounts",
  templateUrl: "./bank-accounts.component.html",
  styleUrls: ["./bank-accounts.component.css"],
})
export class BankAccountsComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-finance-bankaccounts-import',
      subText:'resources.dashboard-finance-bankaccounts-import-newbankstatement',
      sref: '/finance/bankaccounts/import',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBankAccountsImport
    },
    {
      text:'resources.dashboard-finance-bankaccounts-allocate',
      subText:'resources.dashboard-finance-bankaccounts-allocate-bankstatemententries',
      sref: '/finance/bankaccounts/allocate',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBankAccountsAllocate
    },
    {
      text:'resources.dashboard-finance-bankaccounts-bankstatements',
      subText:'resources.dashboard-finance-bankaccounts-bankstatements-saved',
      sref: '/finance/bankaccounts/bankstatementsbymonth',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBankAccountsBankstatements
    }
  ]
}
