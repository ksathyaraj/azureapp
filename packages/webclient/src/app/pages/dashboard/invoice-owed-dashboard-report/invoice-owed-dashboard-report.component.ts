import { Component } from '@angular/core';
import { DateService } from 'packages/shared-lib/src/lib/services/date.service';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';

@Component({
  selector: 'web-invoice-owed-dashboard-report',
  templateUrl: './invoice-owed-dashboard-report.component.html',
  styleUrls: ['./invoice-owed-dashboard-report.component.scss']
})
export class InvoiceOwedDashboardReportComponent {

  constructor(
              private dateService: DateService,
              private dashboardDataService: DashboardDataService,
              private navigationService: NavigationService
             ) { }

  fromDate = this.dateService.getTodaysDate();
  totalOutstanding = 0;
  hasData = true;


  labels: string[]=[];
  series: string[]=[];
  colours: any=[];
  options: any; 
  legend: any={};
  data: any=[];
  showSpinner = true

  initGraph() {
      this.labels = ['Current', '30 days', '60 days', '90 days & over'];
      this.series = ['outstanding'];
      this.colours = ['#cccac9'];
      this.options = {
        indexAxis: 'y',
          animation: false,
          scales: {
              x: {
                  //stacked: true
                  display: false,
                  ticks: {
                      min: 0,
                      beginAtZero: true
                  }
              },
              y: {
                  //stacked: true,
                  display: false
              }
          },
          legend: {
              display: true
          }
      };

      this.data = [{data:[1000, 300, 400, 800],
                    label:'outstanding',
                    backgroundColor: "#cccac9",
                    hoverBackgroundColor: "#cccac9",
                    borderColor: "#cccac9",
                    hoverBorderColor: "#cccac9"}];
  }

  configGraph() {
      this.colours = [{
              backgroundColor: "#F47721",
              hoverBackgroundColor: "#F47721",
              borderColor: "#F47721",
              hoverBorderColor: "#F47721"
      }];

      this.options = {
          indexAxis: 'y',
          animation: false,
          tooltips: {
              callbacks: {
                  label: (tooltipItems: any, data: any) => {
                      if (parseInt(tooltipItems.xLabel) > 1000) {
                          return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.xLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                          return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.xLabel;
                      }
                  }
              }

          },
          scales: {
              x: {
                  //stacked: true
                  display: true,
                  ticks: {
                      min: 0,
                      beginAtZero: true,
                      callback: (label: string, index: number, labels: string[]) => {
                          if (parseInt(label) > 1000) {
                              return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                              return label;
                          }
                      }
                  }
              },
              y: {
                  //stacked: true,
                  display: true
              }
          },
          legend: {
              display: true
          }
      };
  }

  getData(refresh: boolean) {
      this.initGraph();

      this.dashboardDataService.getInvoiceOwedDashboardReport(this.fromDate, refresh).subscribe((data: any) => {
          this.showSpinner = false;
          this.hasData = data.hasData;

          if (this.hasData) {
              this.configGraph();

              this.totalOutstanding = data.totalOutstanding;
              this.data = [
                  {
                    data:[data.currentTotal, data.thirtyDaysTotal, data.sixtyDaysTotal, data.ninetyDaysTotal],
                    label: 'outstanding',
                    backgroundColor: "#F47721",
                    hoverBackgroundColor: "#F47721",
                    borderColor: "#F47721",
                    hoverBorderColor: "#F47721"
                  }
              ];
          }
      });
  }

  filter(refresh: boolean) {
      this.showSpinner = true;
      this.getData(refresh);
  }

  redirectTo() {
      this.navigationService.goToCustomerInvoices();
  }

  ngOnInit() {
      this.showSpinner = true;
      this.getData(false);
  }

}
