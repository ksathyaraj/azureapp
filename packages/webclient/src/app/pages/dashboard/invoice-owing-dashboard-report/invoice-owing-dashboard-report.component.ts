import { Component } from '@angular/core';
import { DateService } from 'packages/shared-lib/src/lib/services/date.service';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';

@Component({
  selector: 'web-invoice-owing-dashboard-report',
  templateUrl: './invoice-owing-dashboard-report.component.html',
  styleUrls: ['./invoice-owing-dashboard-report.component.scss']
})
export class InvoiceOwingDashboardReportComponent {

  constructor(
              private dateService: DateService,
              private dashboardDataService: DashboardDataService,
              private navigationService: NavigationService
             ) {}

  dateOptions: any = {
      'show-weeks': false
  }
  openedStart = false;
  openedEnd = false;
  fromDate = this.dateService.getDefaultStartOfYear();
  toDate = this.dateService.getDefaultEndOfYear();
  hasData = true;
  showGray = true;
  data: any = {};
  showSpinner = true

  getData(refresh: boolean) {
      this.dashboardDataService.getInvoiceOwingDashboardReport(this.fromDate, this.toDate, refresh).subscribe((data: any) => {
      this.showSpinner = false;
      this.hasData = data.hasData;

        if (this.hasData) {
          this.showGray = false;
          this.data = data;
        }
      });
  }

  filter(refresh: boolean) {
      this.showSpinner = true;
      this.getData(refresh);
  }

  initDisplayData() {
      this.data.outstanding = 0;
      this.data.overdue = 0;
      this.data.percentage = '40%';
  }

  // initToolTip() {
  //     $(document).ready(function () {
  //         $('[data-toggle=tooltip]').hover(function () {
  //             // on mouseenter
  //             $(this).tooltip({ html: true }, 'show');
  //         }, function () {
  //             // on mouseleave
  //             $(this).tooltip('hide');
  //         });
  //     });
  // }

  ngOnInit() {
      this.showSpinner = true;
      // this.initToolTip();
      this.initDisplayData();
      this.getData(false);
  }

  redirectTo() {
      this.navigationService.goToSupplierInvoices();
  }
}
