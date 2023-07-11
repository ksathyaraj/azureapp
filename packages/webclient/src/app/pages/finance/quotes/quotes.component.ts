import { Component } from '@angular/core';
import { navButtonGrid } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { EnumsService } from 'packages/shared-lib/src/lib/services/enums.services';

@Component({
  selector: 'web-finance',
  templateUrl: './quotes.component.html'
})
export class QuotesComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-finance-quotes-quotes',
      sref: '/finance/quotes/quotes',
      buttonSupportName: this.enumService.dashboardButtons.FinanceQuotesQuotes
    },
    {
      text:'resources.dashboard-finance-quotes-pricelist',
      subText:'resources.dashboard-finance-quotes-pricelist-searchoradd',
      sref: '/finance/quotes/pricelist',
      buttonSupportName: this.enumService.dashboardButtons.FinanceQuotesPricelist
    }
  ]
}
