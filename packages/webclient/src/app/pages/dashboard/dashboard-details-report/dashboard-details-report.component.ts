import { Component, NgZone } from '@angular/core';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';

@Component({
  selector: 'web-dashboard-details-report',
  templateUrl: './dashboard-details-report.component.html',
  styleUrls: ['./dashboard-details-report.component.scss']
})
export class DashboardDetailsReportComponent {

  constructor(
                private dashboardDataService: DashboardDataService,
                private navigationService: NavigationService,
                private messagingService: MessagingService,
                private ngZone: NgZone
             ) { 
             }

  showSpinner = true
  data: any = {}
  cashflowSpinner = true
  cashFlowData : any = { }

  private getData() {
      this.dashboardDataService.getDashboardDetailsReport().subscribe((data) =>{
          this.showSpinner = false;
          this.data = data;
      });
  }

  cashFlowDataCompleteEvent(args : any) {
    this.cashflowSpinner = false;
    this.cashFlowData = args.data;
  }

  
  // private activate() {
  //   this.showSpinner = true;
  //   this.cashflowSpinner = true;
  //   this.getData();
  // }

  redirectToUnallocated() {
      this.navigationService.goToBankStatementAllocation();
  }

  redirectToCashFlow() {
      this.navigationService.goToCashFlow();
  }

  ngOnInit() {
    this.getData();
    this.messagingService.listenCashFlowDataCompleteEvent((data) => this.cashFlowDataCompleteEvent(data));
  }
  

}

