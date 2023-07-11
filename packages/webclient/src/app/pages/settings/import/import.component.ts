import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-import",
  templateUrl: "./import.component.html"
})
export class ImportComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-settings-import',
      subText: 'resources.dashboard-settings-import-contacts',
      sref: '/settings/import/import',
      buttonSupportName: this.enumService.dashboardButtons.ImportOrganisations
    },
    {
      text:'resources.dashboard-settings-import',
      subText: 'resources.dashboard-settings-import-bankstatement',
      sref: '/settings/import/imports/bankstatement',
      buttonSupportName: this.enumService.dashboardButtons.ImportBankStatement
    },
    {
      text:'resources.dashboard-settings-import',
      subText:'resources.dashboard-settings-import-customerinvoice',
      sref: '/settings/import/imports/customerinvoice',
      buttonSupportName: this.enumService.dashboardButtons.ImportCustomerInvoice
    }
  ]
}
