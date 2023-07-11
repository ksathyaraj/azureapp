import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Adjustment } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { InvoicingDataService } from "packages/shared-lib/src/lib/services/invoicing-data.service";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { subscribeOn } from "rxjs";

@Component({
  selector: "web-adjustment",
  templateUrl: "./adjustment.component.html",
  styleUrls: ["./adjustment.component.scss"],
})
export class AdjustmentComponent {
showDebitLedgerAccountDetails: any;
showCreditLedgerAccountDetails: any;
  debit: any = {};
  credit: any = {};
constructor(private dataService: DataService, private dateService: DateService,  private modalService: ModalService, private messagingService : MessagingService,  private notificationBarService : NotificationBarService, private navigation : NavigationService, private translateService: TranslateService) { }
  creditAdjustmentLedgerAccounts: any;
  debitAdjustmentLedgerAccounts: any;
  filtered = true;
  saveButton = false;
  savesuccessmessage = '';
  repoSubLabel = '';
  repoLabel = '';
  accountLabel = '';
  datePlaceHolder = webConstants.datePlaceHolderMessage
adjustment: Adjustment = {
  reportingDate: undefined,
  debitLedgerAccount: [],
  creditLedgerAccount: [],
  amount: undefined,
  reference: ""
  };

  ngOnInit() {
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.initTranslation();
    this.getData(true);
  }
   enableSaveButton(args:any) {
      this.saveButton = false;
   }
  
   initTranslation() {
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((res: string) => {
      this.savesuccessmessage = res;
    });
     this.translateService.get('resources.accountant-accountant-adjustments-add-label-reportingsubcategory').subscribe((res: string) => {
      this.repoSubLabel = res;
     });
      this.translateService.get('resources.accountant-accountant-adjustments-add-label-reportingcategory').subscribe((res: string) => {
      this.repoLabel = res;
      });
      this.translateService.get('resources.accountant-accountant-adjustments-add-label-accounttype').subscribe((res: string) => {
      this.accountLabel = res;
    });
  }
  getData(refresh: boolean) {
    this.dataService.getLookupData(webApi.adjustmentLedgerAccounts, refresh).subscribe((response: any) => {
      this.creditAdjustmentLedgerAccounts = response;
      this.debitAdjustmentLedgerAccounts = response;
    })
  }
  accountChange(adjustmentModel: any, debit: boolean) {
    let selectAccount;
    if (debit) {
     selectAccount = this.debitAdjustmentLedgerAccounts.filter((x: { id: any; }) => x.id === adjustmentModel);
      adjustmentModel = selectAccount[0];
    } else {
     selectAccount = this.creditAdjustmentLedgerAccounts.filter((x: { id: any; }) => x.id === adjustmentModel);
      adjustmentModel = selectAccount[0];
    }
      if (adjustmentModel.isDebtorsControlAccount) {
          this.getCustomers(adjustmentModel,true);
      } else if (adjustmentModel.isCreditorsControlAccount) {
          this.getSuppliers(adjustmentModel,true);
      }
    if (debit) {
        this.debit.debitLedgerAccount = adjustmentModel;
    } else {
        this.credit.creditLedgerAccount = adjustmentModel;
    }
    this.saveButton = false;
  }
  getSuppliers(model: any, refresh: boolean) {
    this.dataService.getLookupData(this.filtered ? webApi.suppliersFiltered : webApi.suppliers, refresh).subscribe((data: any) => {
      model.contacts = data;
      
    });
  }
  getCustomers(model: any, refresh: boolean) {
    this.dataService.getLookupData(this.filtered ? webApi.customersFiltered : webApi.customers, refresh).subscribe((data: any) => {
      model.contacts = data;
    });
  }

save (form:any) { 
    this.messagingService.broadcastCheckFormValidatity();
    if (!form.invalid) { 
      this.saveButton = true;
      const getAdjustment = this.getAdjustmentObject();
      this.dataService.post(webApi.saveAdjustment, getAdjustment).subscribe((result: any) => {
                    this.notificationBarService.success(this.savesuccessmessage);
                    this.dataService.invalidateRouteCache(webApi.adjustments);
                    this.navigation.goToParentState();
      })
    }
}
   reportingDate(event: any) {
    this.adjustment.reportingDate = event;
  }
  getAdjustmentObject() {
    const creditAccount = this.creditAdjustmentLedgerAccounts.find((x: { id: any; }) => x.id === this.adjustment.creditLedgerAccount);
    const debitAccount = this.debitAdjustmentLedgerAccounts.find((x: { id: any; }) => x.id === this.adjustment.debitLedgerAccount);

    this.adjustment.creditLedgerAccount = creditAccount;
    this.adjustment.debitLedgerAccount = debitAccount;

    const adjustment = {

                reportingDate: this.dateService.getFormattedDateForWebApi(this.adjustment.reportingDate),
                debitedLedgerAccountId: this.adjustment?.debitLedgerAccount?.id,
                creditedLedgerAccountId: this.adjustment?.creditLedgerAccount?.id,
                amount: this.adjustment.amount,
                reference: this.adjustment.reference,
                debitedContactId: this.adjustment?.debitLedgerAccount?.contact != null ? this.adjustment.debitLedgerAccount.contact.key : null,
                creditedContactId: this.adjustment?.creditLedgerAccount?.contact != null ? this.adjustment.creditLedgerAccount.contact.key : null,
                debitLedgerHasContactSelected: (this.adjustment?.debitLedgerAccount?.isDebtorsControlAccount || this.adjustment?.debitLedgerAccount?.isCreditorsControlAccount),
                creditLedgerHasContactSelected: (this.adjustment?.creditLedgerAccount?.isDebtorsControlAccount || this.adjustment?.creditLedgerAccount?.isCreditorsControlAccount)
            };

            return adjustment;
  }

}
