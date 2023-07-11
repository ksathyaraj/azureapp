import { Component } from '@angular/core';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';

@Component({
  selector: 'web-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor( private dashboardDataService : DashboardDataService,
               private messagingService : MessagingService ){ }

  ngOnInit(){
    this.dashboardDataService.getCashFlowDashboardReport(false).subscribe((data:any) => {
      //this timeout call is to cater for a race condition when the data is cached, do not remove it
      setTimeout(()=> {
          this.messagingService.broadcastCashFlowDataCompleteEvent({ data: data });
      }, 200);
  });
  }

}
