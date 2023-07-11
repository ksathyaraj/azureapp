import { Component } from "@angular/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { UtilityDataService } from "packages/shared-lib/src/lib/services/utility-data.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from 'linq';
import BigNumber from "bignumber.js";

@Component({
  selector: "web-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.scss"],
})

export class SetupComponent {

  takeOnBalanceObject: any;
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private utilityDataService: UtilityDataService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
  ) { }

  supportVideoBaseUrl = webConstants.setUpHelpURL;
  savesuccessmessage = '';
  warningMessage = '';
  warningMessageHeading = '';
  
  getData() {
    this.dataService.getRecord(webApi.setUpRecords).subscribe((response: any) => {
      this.takeOnBalanceObject = response;
    });
  }

  calculateAssetsGroupBalance(item: any) {
    if (item == undefined) { return; }
    //If not numeric the balance will be undefined
    if (item.balance == undefined) { return; }

    //Accumulated Depreciation items, make the balance negative
    if (item.isBalanceNegative) { item.balance *= -1; }
    const nonCurrentAssetBalance = Enumerable.from(this.takeOnBalanceObject.assetsGroup.nonCurrentAsset).sum((c: any) => {
      return c.balance;
    });
    const currentAssetBalance = Enumerable.from(this.takeOnBalanceObject.assetsGroup.currentAsset).sum((c: any) => {
      return c.balance;
    });

    this.takeOnBalanceObject.assetsGroupBalance = nonCurrentAssetBalance + currentAssetBalance;
    this.takeOnBalanceObject.assetsGroupBalance = new BigNumber(this.takeOnBalanceObject.assetsGroupBalance).decimalPlaces(2).toNumber();
  }

  calculateEquityGroupBalance(item: any) {
    if (item == undefined) { return; }
    //If not numeric the balance will be undefined
    if (item.balance == undefined) { return; }

    const currentLiabilityBalance = Enumerable.from(this.takeOnBalanceObject.equityGroup.currentLiability).sum((c: any) => {
      return c.balance;
    });
    const nonCurrentLiabilityBalance = Enumerable.from(this.takeOnBalanceObject.equityGroup.nonCurrentLiability).sum((c: any) => {
      return c.balance;
    });
    const equityBalance = Enumerable.from(this.takeOnBalanceObject.equityGroup.equity).sum((c: any) => {
      return c.balance;
    });

    this.takeOnBalanceObject.equityGroupBalance = currentLiabilityBalance + nonCurrentLiabilityBalance + equityBalance;
    this.takeOnBalanceObject.equityGroupBalance = new BigNumber(this.takeOnBalanceObject.equityGroupBalance).decimalPlaces(2).toNumber();
  }

  calculateDebtorsBalance(item: any) {
    if (item == undefined) { return; }
    //If not numeric the balance will be undefined
    if (item.balance == undefined) { return; }

    const debtorsBalance = Enumerable.from(item.childrenSuspenseAccounts).sum((c: any) => {
      return c.balance;
    });
    item.balance = debtorsBalance;
    this.calculateAssetsGroupBalance(item);
  }

  calculateCreditorsBalance(item: any) {
    //If not numeric the balance will be undefined
    if (item.balance == undefined) { return; }

    const creditorsBalance = Enumerable.from(item.childrenSuspenseAccounts).sum((c: any) => {
      return c.balance;
    });
    item.balance = creditorsBalance;
    this.calculateEquityGroupBalance(item);
  }

  calculateVatBalance(item: any) {

    //If not numeric the balance will be undefined
    if (item == undefined) { return; }
    if (item.balance == undefined) { return; }

    const vatOutBalance = Enumerable.from(item.childrenSuspenseAccounts).where((c: any) => {
      return c.isSubAccountCreditedLedger;
    }).sum((c: any) => {
      return c.balance;
    });
    const vatInBalance = Enumerable.from(item.childrenSuspenseAccounts).where((c: any) => {
      return !c.isSubAccountCreditedLedger;
    }).sum((c: any) => {
      return c.balance;
    });
    item.balance = new BigNumber(vatOutBalance + (vatInBalance * -1)).decimalPlaces(2).toNumber();
    this.calculateEquityGroupBalance(item);
  }

  save(takeOnBalance: any, form: any) {
    this.messagingService.broadcastCheckFormValidatity();

    if (!form.invalid) {
      const message = this.warningMessage;
      this.modalService.questionModal(this.warningMessageHeading, message).result.then(() => {
        this.dataService.post(webApi.saveSetUpBalances, takeOnBalance).subscribe((result: any) => {
          this.notificationBarService.success(this.savesuccessmessage);
          this.getData();

          this.utilityDataService.broadcastCompanyProfileSavedAfterTimelapse();
        });
      });
    }

  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')

    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
      this.savesuccessmessage = msg;
    });

    this.translateService.get('resources.accountant-setup-warningmessage').subscribe((msg: any) => {
      this.warningMessage = msg;
    });

    this.translateService.get('resources.accountant-setup-warningmessageheading').subscribe((msg: any) => {
      this.warningMessageHeading = msg;
    });

  }

  ngOnInit() {

    this.initTranslation();
    this.getData();
  }

}
