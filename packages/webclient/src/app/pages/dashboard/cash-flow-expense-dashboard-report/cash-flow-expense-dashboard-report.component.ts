import { Component } from '@angular/core';
import { DashboardDataService } from 'packages/shared-lib/src/lib/services/dashboard-data.service';
import { DateService } from 'packages/shared-lib/src/lib/services/date.service';
import { env } from 'packages/shared-lib/src/environments/environment';

@Component({
  selector: 'web-cash-flow-expense-dashboard-report',
  templateUrl: './cash-flow-expense-dashboard-report.component.html',
  styleUrls: ['./cash-flow-expense-dashboard-report.component.scss']
})
export class CashFlowExpenseDashboardReportComponent {

  constructor(
              private dateService: DateService,
              private dashboardDataService: DashboardDataService
             ){}

  //Datepicker
  dateOptions = {
      'show-weeks': false
  }
  openedStart = false;
  openedEnd = false;
  fromDate =  this.dateService.getDefaultStartOfYear();
  toDate = this.dateService.getDefaultEndOfYear();
  hasData = false;
  totalExpenseAmount = 0;
  labels = ['Cellphone', 'Rent', 'Travel'];
  colours = ['#cccac9', '#cccac9', '#cccac9'];
  data: any = [];
  options: any ={};
  showSpinner = false;

  configGraph() {
      this.totalExpenseAmount = 0;
      this.labels = ['Cellphone', 'Rent', 'Travel'];
      this.colours = ['#cccac9', '#cccac9', '#cccac9'];
      this.data = [{data:[1000, 300, 700],backgroundColor: this.colours}];
      this.options = {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins:{
            tooltips: {
                callbacks: {
                    label: function (tooltipItems: any, data: any) {
                        return data.labels[tooltipItems.index];
                    }
                }

            },
            legend: {
                display: true,
                position: 'right'
            }}
      };
  }

  private shadeColor1(color: string, percent: number) {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);

        R = (R * (100 + percent) / 100);
        G = (G * (100 + percent) / 100);
        B = (B * (100 + percent) / 100);

        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  

        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)

        const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }

   private shadeColor(color: string, amount: number) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

  buildGraph(cashFlowData: any) {
    //   this.colours = env.spendingPieChartColours;

      const ele = document.querySelector(':root');

      let primColor="#2196f3"
      if(ele)
      {
        const cs = getComputedStyle(ele);
        primColor=cs.getPropertyValue('--bs-primary').trim()
      }

      const tempColours=[]


    //   tempColours.push(this.shadeColor(primColor,40))
    //   tempColours.push(this.shadeColor(primColor,30))
      tempColours.push(this.shadeColor(primColor,20))
      tempColours.push(this.shadeColor(primColor,10))
      tempColours.push(this.shadeColor(primColor,0))
      tempColours.push(this.shadeColor(primColor,-10))
      tempColours.push(this.shadeColor(primColor,-20))
      tempColours.push(this.shadeColor(primColor,-30))
      tempColours.push(this.shadeColor(primColor,-40))
      tempColours.push(this.shadeColor(primColor,-50))
      tempColours.push(this.shadeColor(primColor,-60))
      tempColours.push(this.shadeColor(primColor,-70))

      this.colours=tempColours

      this

      this.labels = cashFlowData.expenseLabels;
      this.data = [{data:cashFlowData.data,backgroundColor: this.colours}];
      this.totalExpenseAmount = cashFlowData.totalExpenseAmount;
  }

  getData(refresh: boolean) {
      this.dashboardDataService.getCashFlowExpenseDashboardReport(this.fromDate, this.toDate, refresh).subscribe((data: any) => {
          this.showSpinner = false;
          this.hasData = data.hasData;

          if (this.hasData)
          this.buildGraph(data);
      });
  }


  filter(refresh:boolean) {
      this.showSpinner = true;
      this.getData(refresh);
  }

//   cashFlowDataCompleteEvent(event:any, args:any) {

//   }

  ngOnInit() {
      this.configGraph();
      this.getData(false);
      this.showSpinner = true;
      // MessagingService.listenCashFlowDataCompleteEvent(cashFlowDataCompleteEvent);
  }
}
