import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-import-contacts",
  templateUrl: "./import-contacts.component.html"
})
export class ImportContactsComponent {
  constructor(
    private enumService: EnumsService
){}
  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-settings-import',
      subText: 'resources.dashboard-settings-import-organisations',
      sref: '/settings/import/import/organisations',
      buttonSupportName: this.enumService.dashboardButtons.ImportOrganisations
    },
    {
      text:'resources.dashboard-settings-import',
      subText: 'resources.dashboard-settings-import-organisation-contacts',
      sref: '/settings/import/imports/organisationcontacts',
      buttonSupportName: this.enumService.dashboardButtons.ImportOrganisationContacts
    }
  ]
}
