import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-invoicing",
  templateUrl: "./invoicing.component.html",
  styleUrls: ["./invoicing.component.scss"],
})
export class InvoicingComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-finance-invoicing-customerinvoice',
      subText:'resources.dashboard-finance-invoicing-customerinvoice-debtor',
      sref: '/finance/invoicing/customerinvoices',
      buttonSupportName: this.enumService.dashboardButtons.FinanceInvoicingCustomerInvoice
    },
    {
      text:'resources.dashboard-finance-invoicing-pricelist',
      subText:'resources.dashboard-finance-invoicing-pricelist-searchoradd',
      sref: '/finance/invoicing/pricelist',
      buttonSupportName: this.enumService.dashboardButtons.FinanceInvoicingPricelist
    },
    {
      text:'resources.dashboard-finance-invoicing-creditnote',
      sref: '/finance/invoicing/creditnotes',
      buttonSupportName: this.enumService.dashboardButtons.FinanceInvoicingCreditNote
    },
    {
      text:'resources.dashboard-finance-invoicing-supplierinvoice',
      subText:'resources.dashboard-finance-invoicing-supplierinvoice-creditor',
      sref: '/finance/invoicing/supplierinvoices',
      buttonSupportName: this.enumService.dashboardButtons.FinanceInvoicingSupplierInvoice
    }
  ]
}
