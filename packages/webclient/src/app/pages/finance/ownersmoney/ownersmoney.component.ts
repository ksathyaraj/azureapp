import { Component } from "@angular/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from 'linq';
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";


@Component({
  selector: "web-ownersmoney",
  templateUrl: "./ownersmoney.component.html",
  styleUrls: ["./ownersmoney.component.scss"],
})
export class OwnersmoneyComponent {
  supportVideoBaseUrl = webConstants.ownersMoneyURL;

  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private dateService: DateService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
  ) { }

  confirmDeleteMessage = '';
  deleteSuccessMessage = '';
  modalHeadingReport = '';
  modalHeading = '';
  modalHeadingmessage = '';
  itemInAdjustments = '';
  itemInBankStatement = '';

  members: any = [];
  vatInfo: any = [];
  selectedMember: any;
  selectedMonth: any;
  data: any;
  formattedDate: any;
  monthItems: any;
  paramFilters: any = {};

  getData(refresh: boolean, newLoanAccountAdded?: any, newLoanAccountItemCreatedDate?: any) {
    this.dataService.getLookupData(webApi.loanAccountMembers, refresh).subscribe((response: any) => {
      this.members = response;
      this.init(newLoanAccountAdded, newLoanAccountItemCreatedDate);
    });

    this.dataService.getLookupData(webApi.vatinfo, refresh).subscribe((response: any) => {
      this.vatInfo = response;
    });
  }

  init(newLoanAccountAdded?: any, newLoanAccountItemCreatedDate?: any) {
    if (this.members.length > 0) {// Init Loan Account Dropdown to first record. If new account has been added the code below will set the correct account.
      this.selectedMember = this.members[0];
    }

    if (newLoanAccountAdded != null) {
      this.selectedMember = Enumerable.from(this.members).where((c: any) => {
        return c.displayName == newLoanAccountAdded;
      }).single();
      if (newLoanAccountItemCreatedDate != null) {
        this.selectedMonth = Enumerable.from(this.selectedMember?.monthItems).where((c: any) => {
          return c.formattedMonth == newLoanAccountItemCreatedDate;
        }).singleOrDefault();

        if (this.selectedMonth == null) // All Items have been removed from that month so default first month.
        {
          this.selectedMonth = Enumerable.from(this.selectedMember.monthItems).firstOrDefault();
          if (this.selectedMonth == null) { //All Items have been deleted for this loanaccount so null out items
            this.data = null;
          }
        }
      }
    } else {
      if (this.selectedMember !== undefined && this.selectedMember?.monthItems !== undefined) {
        this.selectedMonth = Enumerable.from(this.selectedMember?.monthItems).firstOrDefault();
      }
    }
    this.selectedMonthChanged(this.selectedMember, this.selectedMonth);
  }

  selectedMonthChanged(selectedMember: any, selectedMonth: any) {
    if (this.selectedMember !== undefined && this.selectedMonth !== undefined) {
      this.dataService.getLookupData(webApi.selectedMonthChange + selectedMember.customLedgerAccountId + '/' + selectedMember.id + '/' + selectedMonth.year + '/' + selectedMonth.month, true).subscribe((result: any) => {
        this.data = result;
      });
    }
  }

  selectedMemberChanged(selectedMember: any) {
    this.selectedMonth = null;
    this.data = null;
    this.selectedMonth = Enumerable.from(this.selectedMember?.monthItems).firstOrDefault();
    this.selectedMonthChanged(this.selectedMember, this.selectedMonth);
  }

  print(selectedMember: any, selectedMonth: any) {
    this.paramFilters["customLedgerAccountId"] = selectedMember.customLedgerAccountId;
    this.paramFilters["loanAccountId"] = selectedMember.id;
    this.paramFilters["year"] = selectedMonth.year;
    this.paramFilters["month"] = selectedMonth.month;

    this.dataService.getReportWithParams(webApi.loanAccountDetails, this.paramFilters).then((dataUrl: any) => {
      this.modalService.openPdfReportModal(this.modalHeadingReport, dataUrl);
    });
  }

  addLoanAccount() {
    this.addNewLoanAccount(null);
  }

  editLoanAccount() {
    this.addNewLoanAccount(this.selectedMember.id, this.selectedMember.displayName, this.selectedMember.customLedgerAccountId);
  }

  addLoanAccountItem(loanAccountItem: any) {

    if (this.checkIfLoanAccountItemHasAdjustmentAllocations(loanAccountItem))
      return;

    if (loanAccountItem.id > 0) {

      const item = Enumerable.from(this.data.items).single((c: any) => {
        return c.id == loanAccountItem.id;
      });

      if (this.checkIfLoanAccountItemHasBusinessCashAllocations(item))
        return;

      if (this.checkIfLoanAccountItemHasBankStatementAllocations(item))
        return;
    }

    const params = {
      showVat: this.vatInfo.showVat,
      vatInfo: this.vatInfo,
      isVatRegistered: this.vatInfo.isVatRegistered,
      customLedgerAccountId: this.selectedMember?.customLedgerAccountId,
      loanAccountItemId: loanAccountItem.id,
      loanAccountId: this.selectedMember?.id,
      loanAccountDisplayName: this.selectedMember?.displayName
    };
    this.modalService.addOwnersMoneyLoanAccountItemModal(params).result.then((createdDate: any) => {
      if (createdDate != null) { // If null it means that nothing was changed on the modal
        this.formattedDate = this.dateService.getFormattedMonthYearDate(createdDate);
        this.getData(true, this.selectedMember?.displayName, this.formattedDate);
      }
    });
  }

  checkIfLoanAccountItemHasBusinessCashAllocations(loanAccountItem: any) {

    if (loanAccountItem.hasBusinessCashAllocations) {
      this.modalService.messageModal(this.modalHeading, this.modalHeadingmessage);
    }
    return loanAccountItem.hasBusinessCashAllocations;
  }

  checkIfLoanAccountItemHasAdjustmentAllocations(loanAccountItem: any) {

    if (loanAccountItem.hasAdjustmentAllocations) {
      this.modalService.messageModal(this.modalHeading, this.itemInAdjustments);
    }
    return loanAccountItem.hasAdjustmentAllocations;
  }

  checkIfLoanAccountItemHasBankStatementAllocations(loanAccountItem: any) {

    if (loanAccountItem.hasBankStatementAllocations) {
      this.modalService.messageModal(this.modalHeading, this.itemInBankStatement);
    }
    return loanAccountItem.hasBankStatementAllocations;
  }

  addNewLoanAccount(loanAccountId?: any, displayName?: any, customLedgerAccountId?: any) {
    this.modalService.addOwnersMoneyLoanAccountModal(loanAccountId, displayName, customLedgerAccountId)
      .result.then((loanAccountName: any) => {
        this.getData(true, loanAccountName);
      });
  }

  deleteLoanAccountItem(loanAccountItem: any) {

    if (this.checkIfLoanAccountItemHasBusinessCashAllocations(loanAccountItem))
      return;

    if (this.checkIfLoanAccountItemHasBusinessCashAllocations(loanAccountItem))
      return;

    if (this.checkIfLoanAccountItemHasBankStatementAllocations(loanAccountItem))
      return;

    this.translateService.get('resources.finance-ownersmoney-confirmdeletemessage').subscribe((response: string) => {
      this.confirmDeleteMessage = response;
    });

    this.translateService.get('resources.finance-ownersmoney-deletesuccessmessage').subscribe((response: string) => {
      this.deleteSuccessMessage = response;
    });

    this.modalService.confirmDelete(this.confirmDeleteMessage + ': ' + loanAccountItem.description + '?').result.then(() => {
      this.dataService.post(webApi.deleteLoanAccountItem, { loanAccountItemId: loanAccountItem.id }).subscribe((data: any) => {
        this.getData(true, this.selectedMember?.displayName, this.selectedMonth?.formattedMonth);
        this.notificationBarService.success(this.deleteSuccessMessage);
      });
    });
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.finance-ownersmoney-pdfmodal-header-ownersmoneyreport').subscribe((msg: any) => {
      this.modalHeadingReport = msg;
    });

    this.translateService.get('resources.finance-ownersmoney-loanaccountitem-heading-loanaccountitem').subscribe((msg: any) => {
      this.modalHeading = msg;
    });

    this.translateService.get('resources.finance-ownersmoney-loanaccountitem-showmessage').subscribe((msg: any) => {
      this.modalHeadingmessage = msg;
    });

    this.translateService.get('resources.finance-ownersmoney-iteminadjustments').subscribe((msg: any) => {
      this.itemInAdjustments = msg;
    });

    this.translateService.get('resources.finance-ownersmoney-iteminbankstatement').subscribe((msg: any) => {
      this.itemInBankStatement = msg;
    });
  }


  ngOnInit() {
    this.messagingService.listenGlobalTranslationRefresh(() => {
      this.initTranslation();
    });
    this.initTranslation();
    this.getData(true);
  }

}