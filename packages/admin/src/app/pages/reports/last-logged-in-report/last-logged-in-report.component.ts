import { Component } from "@angular/core";
import { Column,api,searchUIOptions,resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "admin-last-logged-in-report",
  templateUrl: "./last-logged-in-report.component.html"
})
export class LastLoggedInReportComponent {


  constructor(private modalService : ModalService,
    private dataService : DataService,
    private notificationBarService :NotificationBarService){}

  title='Last Logged In Report';
  lastLoggedInReportColumns:Column[]=[
    
    { columnDef: 'daysSinceLastLoggedIn', header: 'Days Last Logged In'},
    { columnDef: 'companyName', header: 'Registered Company'},
    { columnDef: 'companyLoginName', header: 'Company Login Name'},
    { columnDef: 'registeredDate', header: 'Registered Date',showDateTimeFilter:true},

  ]
  api:api={
    get:webPortal.getLastLoggedinReport
  }
  searchUIOptions: searchUIOptions = {
    searchInput: true
  }
  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound,
    tableSearchPlaceHolder: "search registered company ..."
  };


  emailLastLoggedInReport() {
    this.modalService.showPortalEmailModal('Email Last Logged In Report').result.then((item:any)=> {
            const params={
              title: item.params.title,
              toEmail:item.toEmail
             }
            this.dataService.post(webPortal.emailLastLoggedinReport,params).subscribe(()=> {
                this.notificationBarService.success('Last Logged In Report Email Sent.');
            });
        });

            
  }
}
