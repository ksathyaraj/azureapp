import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "web-custom-ledger-account",
  templateUrl: "./custom-ledger-account.component.html",
})
export class CustomLedgerAccountComponent {
  saveButton = false;
  previousText ='';
  nextText ='';
  selectedAccountType: any = "";
  selectedReportingCategory: any ="" 
  selectedReportingSubCategory: any =""
  reportingCategory: any = [];
  subCategory: any = [];
  constructor(private dataService: DataService, private messagingService : MessagingService, private modalService : ModalService, private translateService: TranslateService, private notificationBarService:NotificationBarService,private navigationService: NavigationService) { }

  customLedgerAccount: any = {
    displayName: "",
    accountTypeViewModels : []
  }
  savesuccessmessage = '';

  ngOnInit() {
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.messagingService.listenGlobalTranslationRefresh(this.initTranslation);
    this.initTranslation();
    this.getData(true);
  }

    enableSaveButton(args:any) {
      this.saveButton = false;
  }

  getData(refresh: any) {
    this.dataService.getLookupData(webApi.customledgerAccountDetails, refresh).subscribe((result: any) => {
      this.customLedgerAccount = result;
    });
  }

  accountTypeChange() {
    let selectAccount;
    if (this.selectedAccountType != undefined) {
      selectAccount = this.customLedgerAccount.accountTypeViewModels.filter((x: { id: any; }) => x.id === this.selectedAccountType);
    }
    const temp = selectAccount[0];
    if (temp != undefined && temp.reportingCategoryViewModels != undefined && temp.reportingCategoryViewModels.length > 0) {
      this.selectedReportingCategory = temp.reportingCategoryViewModels[0].id;
      this.reportingCategory = temp.reportingCategoryViewModels;
      this.reportingCategoryChange();
    } else {
      this.selectedReportingCategory = [];
    }
  }

  reportingCategoryChange() {
     let selectRepoAccount;
    if (this.selectedReportingCategory != undefined) {
      selectRepoAccount = this.reportingCategory.filter((x: { id: any; }) => x.id === this.selectedReportingCategory);
    }
    const temp = selectRepoAccount[0];
    if (temp != undefined && temp.reportingSubCategoryViewModels != undefined && temp.reportingSubCategoryViewModels.length > 0) {
      this.selectedReportingSubCategory = temp.reportingSubCategoryViewModels[0].id;
      this.subCategory = temp.reportingSubCategoryViewModels;
    } else {
      this.selectedReportingSubCategory = [];
    }
  }

  save(frm : any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) { 
      this.modalService.questionModal('Create a Custom General Ledger Account', 'Once a Custom General Ledger Account has been created it is not possible to amend or delete it in any way. Are you sure you want to continue?').result.then(() => {
        this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: string) => { 
          this.savesuccessmessage = msg;
          this.dataService.post(webApi.saveCustomerledgerAccount, this.getCustomLedgerAccountObject()).subscribe(() => {
            this.notificationBarService.success(this.savesuccessmessage);
            this.dataService.invalidateRouteCache(webApi.customledgeraccounts);
            this.navigationService.goToParentState();
          })
        })
      })
    }
  }

  getCustomLedgerAccountObject() {

            const customLedgerAccount = {
                accountType: this.selectedAccountType,
                displayName: this.customLedgerAccount.displayName,
                reportingCategory: this.selectedReportingCategory !== undefined ? this.selectedReportingCategory : null,
                reportingSubCategory: this.selectedReportingSubCategory !== undefined ? this.selectedReportingSubCategory : null
            };

            return customLedgerAccount;
  }

 initTranslation() {
    this.translateService.get('resources.common-previous-label').subscribe((res: string) => {
        this.previousText = res;
    });
    this.translateService.get('resources.common-next-label').subscribe((res: string) => {
        this.nextText = res;
    });
  }


}
