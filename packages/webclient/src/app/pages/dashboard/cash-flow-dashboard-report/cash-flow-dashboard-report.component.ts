import { Component } from '@angular/core';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NavigationService } from 'packages/shared-lib/src/lib/services/navigation.service';

@Component({
  selector: 'web-cash-flow-dashboard-report',
  templateUrl: './cash-flow-dashboard-report.component.html',
  styleUrls: ['./cash-flow-dashboard-report.component.scss']
})
export class CashFlowDashboardReportComponent {

  constructor(
              private dashboardDataService: DashboardDataService,
              private navigationService: NavigationService,
              private messagingService: MessagingService
             ) {}

  hasData = false;
  showSpinner = false;
  labels: any = [];
  series: any = [];
  colours: any = [];
  options: any = {};
  data: any = [];

  refresh() {
      this.showSpinner = true;
      this.dashboardDataService.getCashFlowDashboardReport(true).subscribe((data: any) => {
          this.messagingService.broadcastCashFlowDataCompleteEvent({ data: data });
          // this.cashFlowDataCompleteEvent(data)
      });
  }


  initGraph() {
      this.labels = ['', '', '', '', '', '', '', '', ''];
      this.series = ['Money In', 'Money Out'];
      this.colours = ['#cccac9','#cccac9'];
      // this.options = {
      //     animation: false,
      //     //responsive: false,
      //     //maintainAspectRatio: false,
      //     scales: {
      //         yAxes: [
      //         {
      //             display: false
      //         }],
      //         xAxes: [
      //         {
      //             display: false
      //         }]
      //     },
      //     legend: {
      //         display: true
      //     }
      // };

      this.options = {
        animation: false,
        scales:{
          x: {
            display:false
          },
          y: {
            display:false
          }
        }
      }

      this.data = [
          {
            data:[1000, 2000, 500, 800, 1700, 1200, 1400, 400, 900],
            label: this.series[0],
            backgroundColor: "#cccac9",
            hoverBackgroundColor: "#cccac9",
            borderColor: "#cccac9",
            hoverBorderColor: "#cccac9"
          },
          {
            data:[500, 1200, 900, 700, 1000, 400, 1300, 100, 1200],
            label: this.series[1],
            backgroundColor: "#cccac9",
            hoverBackgroundColor: "#cccac9",
            borderColor: "#cccac9",
            hoverBorderColor: "#cccac9"
          }
      ];
  }

  configGraph() {
      this.colours = [{
          backgroundColor: "#72A309",
          hoverBackgroundColor: "#72A309",
          borderColor: "#72A309",
          hoverBorderColor: "#72A309"
      },
      {
          backgroundColor: "#DC0032",
          hoverBackgroundColor: "#DC0032",
          borderColor: "#DC0032",
          hoverBorderColor: "#DC0032"
      }];

      this.options = {
          animation: false,
          // responsive: false,
          //maintainAspectRatio: false,
          plugins:{
            tooltip: {
                callbacks: {
                    // label: (data: any) => {
                    //   console.log(data)
                    //   // console.log(data)
                    //   //   if (parseInt(tooltipItems.yLabel) > 1000) {
                    //   //       return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    //   //   } else {
                    //   //       return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel;;
                    //   //   }

                    //     // if (data.parsed.y > 1000) {
                    //     //     return this.series[0] + ': ' + data.dataset[data.dataIndex];
                    //     // } else {
                    //     //     return this.series[1] + ': ' + data.dataset[data.dataIndex];
                    //     // }

                    //     return this.series[0] + ': ' + this.data[0].data[data.dataIndex] + '\n' + this.series[1] + ': ' + this.data[1].data[data.dataIndex] 
                    // }
                }

            }
          },
          scales: {
              y: 
              {
                  display: true,
                  ticks: {
                      callback: function(label: string, index: number, labels: string) {
                          if (parseInt(label) > 1000) {
                              return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                              return label;
                          }
                      }
                  }
              },
              x: 
              {
                  display: true
              }
          },
          legend: {
              display: true
          }
      };
  }

  buildGraph(cashFlowData: any) {
      this.configGraph();

      this.labels = cashFlowData.cashFlowDashboardReport.datesRepresented;
      this.data = cashFlowData.cashFlowDashboardReport.data;

      this.data =this.data.map((elem: any, idx: number) => {
          return { data:elem, 
                   label: this.series[idx],
                   backgroundColor: this.colours[idx].backgroundColor,
                   hoverBackgroundColor: this.colours[idx].hoverBackgroundColor,
                   borderColor: this.colours[idx].borderColor,
                   hoverBorderColor: this.colours[idx].hoverBorderColor
                 }
      })
  }

  cashFlowDataCompleteEvent(args: any) {

    const data=args.data

    this.showSpinner = false;
    this.hasData = data.cashFlowDashboardReport.hasData;
   
    if(this.hasData)
      this.buildGraph(data);
  }

  redirectTo() {
      this.navigationService.goToCashFlow();
  }

  activate() {
      this.initGraph();
      this.showSpinner = true;
  }

  ngOnInit() {
    this.activate();
    // this.refresh();
    this.messagingService.listenCashFlowDataCompleteEvent((data) => this.cashFlowDataCompleteEvent(data));
  }
  

}
