import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { bankingDetail } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { NgForm } from "@angular/forms";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";

@Component({
  selector: "web-add-historical-bank",
  templateUrl: "./add-historical-bank.component.html"
})
export class AddHistoricalBankComponent implements OnInit{

  constructor(private dataService: DataService, private navigationService: NavigationService, private notificationService: NotificationBarService, private translateService: TranslateService, private messagingService : MessagingService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.bankingDetailId = parseInt(params['id']);
    });
  }

  bankingDetail = {
    isPreferredBank: false,
    hasTransactions: false,
    bankId: '',
    accountName: '',
    accountNo: '',
    bankAccountTypeId: '',
    branch: '',
    branchCode: '',
    swiftCode: ''
  };
  banks = [];
  bankAccountTypes = [];
  saveButton = false;
  saveSuccessMessage = '';
  bankingDetailId = 0;

  ngOnInit() {
    this.getBanks();
    this.getBankAccountTypes();
    this.getTranslation();
    if(this.bankingDetailId !== 0) {
      this.getBankingDetail();
    }
  }

  getBanks() {
    this.dataService
      .getLookupData(webApi.getBanks, true)
      .subscribe((data: any) => {
        this.banks = data;
      });
  }

  getBankAccountTypes() {
    this.dataService
      .getLookupData(webApi.getBankAccountTypes, true)
      .subscribe((data: any) => {
        this.bankAccountTypes = data;
      });
  }

  getBankingDetail() {
    this.dataService
      .getLookupData( webApi.getBankingDetail + this.bankingDetailId ,true)
      .subscribe((data: any) => {
        this.bankingDetail = data;
      });
  }

  save(bankingDetail: bankingDetail, addHistoricalForm: NgForm) {
    this.messagingService.broadcastCheckFormValidatity();
    if(!addHistoricalForm.invalid) {
    this.dataService
      .post(webApi.postBankingDetail, bankingDetail)
      .subscribe((data: any) => {
        this.notificationService.success(this.saveSuccessMessage);
        this.navigationService.goToParentState();
      });
    }
  }

  getTranslation() {
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((res: string) => {
      this.saveSuccessMessage = res;
    });
  }
}
