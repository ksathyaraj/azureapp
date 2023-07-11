import { Component } from '@angular/core';
import { navButtonGrid } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { EnumsService } from 'packages/shared-lib/src/lib/services/enums.services';

@Component({
  selector: 'web-finance',
  templateUrl: './finance.component.html'
})
export class FinanceComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] = [
    {
      text: "resources.dashboard-finance-quotes",
      sref: '/finance/quotes',
      buttonSupportName: this.enumService.dashboardButtons.FinanceQuotesQuotes
    },
    {
      text: "resources.dashboard-finance-businesscash",
      sref: '/finance/businesscash',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBusinesCash
    },
    {
      text: "resources.dashboard-finance-ownersmoney",
      subText: "resources.dashboard-finance-ownersmoney-loanaccount",
      sref: '/finance/ownersmoney',
      buttonSupportName: this.enumService.dashboardButtons.FinanceOwnersMoney
    },
    {
      text: "resources.dashboard-finance-invoicing",
      sref: '/finance/invoicing',
      buttonSupportName: this.enumService.dashboardButtons.FinanceInvoicing
    },
    {
      text: "resources.dashboard-finance-bankaccounts",
      sref: '/finance/bankaccounts',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBankAccounts
    },
    {
      text: "resources.dashboard-finance-businessloans",
      sref: '/finance/businessloans',
      buttonSupportName: this.enumService.dashboardButtons.FinanceBusinessLoans
    }
  ]
}
