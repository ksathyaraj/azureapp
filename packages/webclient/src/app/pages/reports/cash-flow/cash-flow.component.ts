import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from "linq";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { api } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "web-cash-flow",
  templateUrl: "./cash-flow.component.html",
  styleUrls: ["./cash-flow.component.scss"],
})
export class CashFlowComponent implements OnInit{
  constructor(private dataService: DataService, private dateService: DateService,private messagingService : MessagingService,
    private translateService : TranslateService, private notificationBarService:NotificationBarService, 
    private modalService: ModalService, private enumService: EnumsService,) {

  }

  helpLinkURL = webConstants.cashFlowHelpUrl;
  exportButton = true;
  addNewButton = false;
  pdfButton = true;
  title = 'resources.reports-cashflow-pageheading-cashflow';
  refreshButton = false;
  showCategories = false;
  moneyInCategoryName = '';
  cashFlow: any = [];
  showAllCategories = false;
  cashGaugeItemTypes:any = [];
  isCustom = false;
  isMoneyInCustomItemValid = true;
  cashFlowType: any;
  isMoneyOutCustomItemValid = true;
  moneyOutCategoryName = '';
  savesuccessmessage = '';

  api: api = {
    export: webApi.exportCashFlow,
    pdf: webApi.pdfCashFlow,
    pdfParams: {showCategories: this.showCategories},
    exportParams: {showCategories: this.showCategories}
  };

  ngOnInit() {
    this.getData();
    this.getLookupData();
    this.getTranslation();
    this.cashFlowType = this.enumService.cashFlowType;
  }

  getData() {
    const paramFilters = {showAllCategories: true};
    this.dataService.getRecordWithParams(webApi.getCashFlow, paramFilters)
    .subscribe((data: any) => {
     this.cashFlow = data;
    });
  }

  getLookupData() {
    this.dataService
      .getLookupData(webApi.cashGaugeItemTypes, true)
      .subscribe((data: any) => {
        this.cashGaugeItemTypes = data;
      });
  }

  // addDecimal(event: number) {
  //   // this.qte = Number.parseFloat(event).toFixed(2);
  //   return event.toFixed(2);
  // }

  viewDetail(ledgerAccountId:any, dateRepresented:any, cashFlowType:any) {
    const paramFilters = {
      ledgerAccountId: ledgerAccountId,
      dateRepresented: this.dateService.getFormattedDateForWebApi(dateRepresented),
      cashFlowType: cashFlowType
    };
    this.dataService.getRecordWithParams(webApi.cashflowledgerentries, paramFilters)
    .subscribe((data: any) => {
      this.modalService.cashFlowModel(data);
    });
  }

  addItem(direction:any) {
    const todaysDate = this.dateService.getTodaysDate();
    let dateRepresented = this.dateService.addMonths(todaysDate, 1);
    dateRepresented = this.dateService.getStartOfMonth(dateRepresented);
    const monthIndex = this.cashFlow.datesRepresented.indexOf(dateRepresented.format('MMM YYYY')) + 1;
    const item = {
        isCustom: true,
        categoryName: '',
        month1: monthIndex === 1 ? this.getMonthData(-2, direction, false) : this.getMonthData(-2, direction, true),
        month2: monthIndex === 2 ? this.getMonthData(-1, direction, false) : this.getMonthData(-1, direction, true),
        month3: monthIndex === 3 ? this.getMonthData(0, direction, false) : this.getMonthData(0, direction, true),
        month4: monthIndex === 4 ? this.getMonthData(1, direction, false) : this.getMonthData(1, direction, true),
        month5: monthIndex === 5 ? this.getMonthData(2, direction, false) : this.getMonthData(2, direction, true),
        month6: monthIndex === 6 ? this.getMonthData(3, direction, false) : this.getMonthData(3, direction, true),
        month7: monthIndex === 7 ? this.getMonthData(4, direction, false) : this.getMonthData(4, direction, true),
        month8: monthIndex === 8 ? this.getMonthData(5, direction, false) : this.getMonthData(5, direction, true),
        month9: monthIndex === 9 ? this.getMonthData(6, direction, false) : this.getMonthData(6, direction, true)
    };
    const cashFlow = JSON.parse(JSON.stringify(this.cashFlow));
    if (direction == "moneyin") {
        item.categoryName = this.moneyInCategoryName;
        cashFlow.moneyInRowItems.push(item);
    } else {
        item.categoryName = this.moneyOutCategoryName;
        cashFlow.moneyOutRowItems.push(item);
    }
    this.cashFlow = cashFlow;
  }

  getMonthData(monthsToAdd:any, direction:any, isEmptyData:any) {
    const todaysDate = this.dateService.getTodaysDate();
    const startDate = this.dateService.getStartOfMonth(todaysDate);
    const dateRep = this.dateService.addMonths(startDate, monthsToAdd);
    const mnthAmount = monthsToAdd > 0 ? 0 : null;
    const monthData = {
        dateRepresented: monthsToAdd === 0 ? this.dateService.getFormattedDateForWebApi(startDate) : this.dateService.getFormattedDateForWebApi(dateRep),
        monthAmount: mnthAmount,
        id: null,
        cashGaugeItemType: direction == 'moneyin' ? this.cashGaugeItemTypes.incomeItem : this.cashGaugeItemTypes.expenseItem,
        cashFlowType: this.cashFlowType.MoneyIn
    }
    return monthData;
  }

  save(cash:any) {
    const cashFlowForm:any = {};
    this.messagingService.broadcastCheckFormValidatity();
    if (!cashFlowForm.$invalid) {
      this.cashFlow.moneyInRowTotal = null;
      this.cashFlow.moneyOutRowTotal = null;
      this.cashFlow.openingBalanceRowTotal = null;
      this.cashFlow.closingBalanceRowTotal = null;
      this.cashFlow.datesRepresented = null;

      const moneyInRowItems = Enumerable.from(this.cashFlow.moneyInRowItems)
          .where(function (c:any) {
              return c.month1.monthAmount > 0.0 ||
                  c.month2.monthAmount > 0.0 ||
                  c.month3.monthAmount > 0.0 ||
                  c.month4.monthAmount > 0.0 ||
                  c.month5.monthAmount > 0.0 ||
                  c.month6.monthAmount > 0.0 ||
                  c.month7.monthAmount > 0.0 ||
                  c.month8.monthAmount > 0.0 ||
                  c.month9.monthAmount > 0.0;
          })
          .toArray();

      const moneyOutRowItems = Enumerable.from(this.cashFlow.moneyOutRowItems)
          .where(function (c:any) {
              return c.month1.monthAmount > 0.0 ||
                  c.month2.monthAmount > 0.0 ||
                  c.month3.monthAmount > 0.0 ||
                  c.month4.monthAmount > 0.0 ||
                  c.month5.monthAmount > 0.0 ||
                  c.month6.monthAmount > 0.0 ||
                  c.month7.monthAmount > 0.0 ||
                  c.month8.monthAmount > 0.0 ||
                  c.month9.monthAmount > 0.0;
          }).toArray();

      this.cashFlow.moneyInRowItems = [];
      this.cashFlow.moneyOutRowItems = [];

      moneyInRowItems.forEach((value:any,key:any)=> {
        value.month4 = this.IsCustomItem(value.month4);
        value.month5 = this.IsCustomItem(value.month5);
        value.month6 = this.IsCustomItem(value.month6);
        value.month7 = this.IsCustomItem(value.month7);
        value.month8 = this.IsCustomItem(value.month8);
        value.month9 = this.IsCustomItem(value.month9);

        value.description = value.categoryName;
        this.cashFlow.moneyInRowItems.push(value);
      })

      moneyOutRowItems.forEach((value:any,key:any) => {
        value.month4 = this.IsCustomItem(value.month4);
        value.month5 = this.IsCustomItem(value.month5);
        value.month6 = this.IsCustomItem(value.month6);
        value.month7 = this.IsCustomItem(value.month7);
        value.month8 = this.IsCustomItem(value.month8);
        value.month9 = this.IsCustomItem(value.month9);

        value.description = value.categoryName;
        this.cashFlow.moneyOutRowItems.push(value);
      })
      this.dataService
      .post( webApi.saveCashflow, this.cashFlow)
      .subscribe(() => {
        this.notificationBarService.success(this.savesuccessmessage);
        this.getData();
      });
  }
  }

  addMoneyInCustomItem() {
    this.isMoneyInCustomItemValid = true;

    if (typeof (this.moneyInCategoryName) === undefined || !(this.moneyInCategoryName.length > 0) || this.moneyInCustomNameExists()) {
        this.isMoneyInCustomItemValid = false;
        return;
    }

    this.addItem("moneyin");
    this.moneyInCategoryName = "";
  }

  moneyInCustomNameExists() {
    const exists = this.cashFlow.moneyInRowItems.filter((data:any) => {
      return data.categoryName.toUpperCase() === this.moneyInCategoryName.toUpperCase();
    })
    // const exists = $linq.Enumerable().From(this.cashFlow.moneyInRowItems)
    //             .Where(function (c) { return c.categoryName.toUpperCase() == this.moneyInCategoryName.toUpperCase(); }).ToArray();
    return exists.length > 0 ? true : false;
  }

  addMoneyOutCustomItem() {
    this.isMoneyOutCustomItemValid = true;
    if (typeof (this.moneyOutCategoryName) === undefined || !(this.moneyOutCategoryName.length > 0) || this.moneyOutCustomNameExists()) {
        this.isMoneyOutCustomItemValid = false;
        return;
    }

    this.addItem("moneyout");

    this.moneyOutCategoryName = "";
  }

  moneyOutCustomNameExists() {
    const exists = this.cashFlow.moneyOutRowItems.filter((data:any) => {
      return data.categoryName.toUpperCase() === this.moneyOutCategoryName.toUpperCase();
    })
    return exists.length > 0 ? true : false;
  }

  IsCustomItem(item:any) {
    if (item.monthAmount !== item.initialMonthAmount) {
      item.isAutoGeneratedItem = true;
    }
    return item;
  }

  calculateExpenseTotals() {
    const month4ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month4.monthAmount; });
    const month5ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month5.monthAmount; });
    const month6ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month6.monthAmount; });
    const month7ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month7.monthAmount; });
    const month8ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month8.monthAmount; });
    const month9ExpenseTotal = Enumerable.from(this.cashFlow.moneyOutRowItems).sum(function (c:any) { return c.month9.monthAmount; });

    this.cashFlow.moneyOutRowTotal.month4.monthAmount = month4ExpenseTotal;
    this.cashFlow.moneyOutRowTotal.month5.monthAmount = month5ExpenseTotal;
    this.cashFlow.moneyOutRowTotal.month6.monthAmount = month6ExpenseTotal;
    this.cashFlow.moneyOutRowTotal.month7.monthAmount = month7ExpenseTotal;
    this.cashFlow.moneyOutRowTotal.month8.monthAmount = month8ExpenseTotal;
    this.cashFlow.moneyOutRowTotal.month9.monthAmount = month9ExpenseTotal;

    for (let i = 4; i < 10; i++) {
        this.calculateGrandTotals(i);
    }
  }

  calculateIncomeTotals() {
    const month4IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month4.monthAmount; });
    const month5IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month5.monthAmount; });
    const month6IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month6.monthAmount; });
    const month7IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month7.monthAmount; });
    const month8IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month8.monthAmount; });
    const month9IncomeTotal = Enumerable.from(this.cashFlow.moneyInRowItems).sum(function (c:any) { return c.month9.monthAmount; });

    this.cashFlow.moneyInRowTotal.month4.monthAmount = month4IncomeTotal;
    this.cashFlow.moneyInRowTotal.month5.monthAmount = month5IncomeTotal;
    this.cashFlow.moneyInRowTotal.month6.monthAmount = month6IncomeTotal;
    this.cashFlow.moneyInRowTotal.month7.monthAmount = month7IncomeTotal;
    this.cashFlow.moneyInRowTotal.month8.monthAmount = month8IncomeTotal;
    this.cashFlow.moneyInRowTotal.month9.monthAmount = month9IncomeTotal;

    for (let i = 4; i < 10; i++) {
        this.calculateGrandTotals(i);
    }
  }

  calculateGrandTotals(monthNumber:any) {
    switch (monthNumber) {
      case 4:
          this.cashFlow.closingBalanceRowTotal.month4.monthAmount = this.cashFlow.openingBalanceRowTotal.month4.monthAmount +
              (this.cashFlow.moneyInRowTotal.month4.monthAmount - this.cashFlow.moneyOutRowTotal.month4.monthAmount);
          break;
      case 5:
          this.cashFlow.openingBalanceRowTotal.month5.monthAmount = this.cashFlow.closingBalanceRowTotal.month4.monthAmount;
          this.cashFlow.closingBalanceRowTotal.month5.monthAmount =
              this.cashFlow.openingBalanceRowTotal.month5.monthAmount +
              (this.cashFlow.moneyInRowTotal.month5.monthAmount - this.cashFlow.moneyOutRowTotal.month5.monthAmount);
          break;
      case 6:
          this.cashFlow.openingBalanceRowTotal.month6.monthAmount = this.cashFlow.closingBalanceRowTotal.month5.monthAmount;
          this.cashFlow.closingBalanceRowTotal.month6.monthAmount =
              this.cashFlow.openingBalanceRowTotal.month6.monthAmount +
              (this.cashFlow.moneyInRowTotal.month6.monthAmount - this.cashFlow.moneyOutRowTotal.month6.monthAmount);
          break;
      case 7:
          this.cashFlow.openingBalanceRowTotal.month7.monthAmount = this.cashFlow.closingBalanceRowTotal.month6.monthAmount;
          this.cashFlow.closingBalanceRowTotal.month7.monthAmount =
              this.cashFlow.openingBalanceRowTotal.month7.monthAmount +
              (this.cashFlow.moneyInRowTotal.month7.monthAmount - this.cashFlow.moneyOutRowTotal.month7.monthAmount);
          break;
      case 8:
          this.cashFlow.openingBalanceRowTotal.month8.monthAmount = this.cashFlow.closingBalanceRowTotal.month7.monthAmount;
          this.cashFlow.closingBalanceRowTotal.month8.monthAmount =
              this.cashFlow.openingBalanceRowTotal.month8.monthAmount +
              (this.cashFlow.moneyInRowTotal.month8.monthAmount - this.cashFlow.moneyOutRowTotal.month8.monthAmount);
          break;
      case 9:
          this.cashFlow.openingBalanceRowTotal.month9.monthAmount = this.cashFlow.closingBalanceRowTotal.month8.monthAmount;
          this.cashFlow.closingBalanceRowTotal.month9.monthAmount =
              this.cashFlow.openingBalanceRowTotal.month9.monthAmount +
              (this.cashFlow.moneyInRowTotal.month9.monthAmount - this.cashFlow.moneyOutRowTotal.month9.monthAmount);
          break;
      default:
  }
  }

  cashFlowCategoryFilter(item:any) {
    if (item.isCustom == false) {
      if (item.hasValues) {
          return true;
      } else if (this.showCategories) {
          return true;
      }
    }
    return false;
  }

  updateCategories() {
    const updateParams = JSON.parse(JSON.stringify(this.api));
    updateParams.pdfParams =  {showCategories: this.showCategories};
    updateParams.exportParams =  {showCategories: this.showCategories};
    this.api = updateParams;
  }

  getTranslation() {
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg:string) => {
      this.savesuccessmessage = msg;
    });
  }

}
