import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-settings",
  templateUrl: "./settings.component.html"
})
export class SettingsComponent {
  constructor(
    private enumService: EnumsService
){}

  navButtonList: navButtonGrid[] =[
    {
      text:'resources.dashboard-settings-companyprofile',
      sref: '/settings/companyprofile',
      buttonSupportName: this.enumService.dashboardButtons.SettingsCompanyProfile
    },
    {
      text:'resources.dashboard-settings-systemuseraccess',
      sref: '/settings/users',
      buttonSupportName: this.enumService.dashboardButtons.SettingsSystemUserAccess
    },
    {
      text:'resources.dashboard-settings-importdashboard',
      subText:'resources.dashboard-settings-import-import',
      sref: '/settings/import',
      buttonSupportName: this.enumService.dashboardButtons.SettingsImport
    }
  ]
}
