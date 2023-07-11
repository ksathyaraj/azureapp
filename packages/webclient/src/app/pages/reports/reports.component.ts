import { Component, OnInit } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-reports",
  templateUrl: "./reports.component.html",
})
export class ReportsComponent implements OnInit{
  constructor(
    private enumService: EnumsService,
    private dataService: DataService
){}

  showVat = false;
  isAPILoaded = false;
  navButtonList: navButtonGrid[] = [];

  ngOnInit() {
    this.dataService.getLookupData(webApi.vatInfo, true).subscribe((response: any) => {
      this.showVat = response.showVat;
      console.log("response -- ", this.showVat);
      this.navButtonList = [
        {
          text:'resources.dashboard-reports-whoownesyou',
          subText: 'resources.dashboard-reports-whoownesyou-customers',
          sref: '/reports/customerinvoicesdue',
          buttonSupportName: this.enumService.dashboardButtons.ReportsWhoOwesUs
        },
        {
          text:'resources.dashboard-reports-whoyouowe',
          subText: 'resources.dashboard-reports-whoyouowe-suppliers',
          sref: '/reports/supplierinvoicesowed',
          buttonSupportName: this.enumService.dashboardButtons.ReportsWhoWeOwe
        },
        {
          text:'resources.dashboard-reports-cashflow',
          subText:'resources.dashboard-reports-cashflow-management',
          sref: '/reports/cashflow',
          buttonSupportName: this.enumService.dashboardButtons.ReportsCashflow
        },
        {
          text:'resources.dashboard-reports-vat',
          sref: '/reports/vat',
          conditionalRender: response.showVat,
          buttonSupportName: this.enumService.dashboardButtons.ReportsVat
        }
      ]
      this.isAPILoaded = true;
    }); 
    
  }
}
