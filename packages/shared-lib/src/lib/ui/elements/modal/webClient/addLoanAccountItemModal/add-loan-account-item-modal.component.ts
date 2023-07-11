import { Component, Input } from "@angular/core";
import "@angular/compiler";
import { NgbActiveModal, } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from 'linq';
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { BusinessLoanAccountItem } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
    selector: "lib-add-owners-money-loan-account-item-modal",
    templateUrl: "./add-loan-account-item-modal.component.html",
    styleUrls: ["./add-loan-account-item-modal.component.css"],
})

export class AddLoanAccountItemModalComponent {
    @Input() params: any = {};
    closeData = webConstants.closeData;

    constructor(
        private dataService: DataService,
        private dateService: DateService,
        private vatService: VatService,
        private modalService: ModalService,
        private messagingService: MessagingService,
        private notificationBarService: NotificationBarService,
        private translateService: TranslateService,
        public activeModal: NgbActiveModal,
    ) { }

    saveSuccessMessage = '';
    updatedsuccessfully = '';
    loanAccountFormItemCopy: any;
    loanAccountItem: any;
    showVat = this.params.showVat;
    vatRate = this.params.vatRate;

    item: BusinessLoanAccountItem = {
        createdDate: undefined,
        selectedLedgerAccount: '',
        description: '',
        reference: '',
        vatAmount: 0,
        exclusiveAmount: 0,
        inclusiveAmmount: '',
    };
    openedCreatedDate = false;
    saveButton = false;

    updatedSuccessfully = '';
    Amount: any;
    Inclusive: any;
    ledgerAccounts: any;
    isLedgerAccountVatable = false;
    datePlaceHolder = webConstants.datePlaceHolderMessage

    getData() {
        this.dataService.getLookupData(webApi.loanLedgerAccounts).subscribe((data: any) => {
            this.ledgerAccounts = data.filter((c: any) => !c.notAllowed);
            this.init();
        });
    }

    init() {
        this.item.selectedLedgerAccount = Enumerable.from(this.ledgerAccounts).single(); //Pre select dropdownbox
        this.ledgerAccountChange(this.item.selectedLedgerAccount);
        if (this.params.loanAccountItemId > 0) {
            this.dataService.getRecord(webApi.loanAccountItems + this.params.loanAccountItemId).subscribe((data: any) => {
                this.loanAccountItem = data;
                this.editLoanAccountItem(data);
            });
        }
    }

    editLoanAccountItem(data: any) {
        this.setLedgerAccountDropdown(data.ledgerAccountId);
        this.item.createdDate = data.dateTime;
        this.item.description = data.description;
        this.item.reference = data.reference;
        this.item.exclusiveAmount = data.amount.toFixed(2);
        this.item.vatAmount = data.vatPortion;
        this.item.inclusiveAmmount = data.total.toFixed(2);
        if (data.contactId != null) {
        }
        this.loanAccountFormItemCopy = { ...this.item };
    }

    setLedgerAccountDropdown(ledgerAccountId: any) {
        this.item.selectedLedgerAccount = Enumerable.from(this.ledgerAccounts).where((c: any) => {
            return c.id == ledgerAccountId;
        }).single();
    }

    calculateInclusiveAmount() {
        if (this.item.inclusiveAmmount == null && this.item.inclusiveAmmount === "")
            return;
        var isVatable = this.isLedgerAccountVatable != null ? this.isLedgerAccountVatable : this.params.showVat;
        this.item.exclusiveAmount = Number(this.vatService.calculateExclusiveAmount(isVatable, this.item.inclusiveAmmount, this.vatRate)).toFixed(2);
        this.item.vatAmount = this.vatService.calculateVat(isVatable, this.vatRate, this.item.exclusiveAmount).toFixed(2);
    };

    passBack(frm: any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (!frm.invalid) {
            this.saveButton = true;

            var modalToReturn = [];

            if (this.params.loanAccountItemId > 0) {//Edit Mode

                if (this.hasLoanAccountItemBeenEdited()) {

                    var newLoanAccountItemAllocation = {
                        ledgerAccountId: this.item.selectedLedgerAccount.id,
                        allocationType: this.item.selectedLedgerAccount.allocationTypeId,
                        dateTime: this.dateService.getFormattedDateForWebApi(this.item.createdDate),
                        description: this.item.description,
                        reference: this.item.reference,
                        amount: this.item.exclusiveAmount,
                        vatPortion: this.item.vatAmount,
                        loanAccountItemAllocationId: null,
                        loanAccountItemId: this.loanAccountItem.loanAccountItemId,
                        loanAccountId: this.loanAccountItem.loanAccountId,
                        customLedgerAccountId: this.loanAccountItem.customLedgerAccountId,
                        loanAccountItemType: this.loanAccountItem.loanAccountItemType,
                        loanAccountDisplayName: this.loanAccountItem.loanAccountDisplayName,
                        isEdited: false
                    };

                    modalToReturn.push(newLoanAccountItemAllocation);

                    var reversalLoanAccountItemAllocation = { ...newLoanAccountItemAllocation };
                    reversalLoanAccountItemAllocation.loanAccountItemAllocationId = this.loanAccountItem.loanAccountItemAllocationId;
                    reversalLoanAccountItemAllocation.ledgerAccountId = this.loanAccountItem.ledgerAccountId,
                        reversalLoanAccountItemAllocation.allocationType = this.loanAccountItem.allocationType,
                        reversalLoanAccountItemAllocation.amount = this.loanAccountItem.amount,
                        reversalLoanAccountItemAllocation.vatPortion = this.loanAccountItem.vatPortion,
                        reversalLoanAccountItemAllocation.isEdited = true;

                    modalToReturn.push(reversalLoanAccountItemAllocation);

                    this.dataService.post(webApi.saveloanAccountItem, { LoanAccountItems: modalToReturn }).subscribe((data: any) => {
                        this.notificationBarService.success(this.updatedSuccessfully);
                        this.activeModal.close(this.item.createdDate);
                    });
                } else {
                    this.activeModal.close(null);
                }

                return;
            }

            //New LoanAccountItem
            var addLoanAccountItem = {
                ledgerAccountId: this.item.selectedLedgerAccount.id,
                allocationType: this.item.selectedLedgerAccount.allocationTypeId,
                dateTime: this.dateService.getFormattedDateForWebApi(this.item.createdDate),
                description: this.item.description,
                reference: this.item.reference,
                amount: this.item.exclusiveAmount,
                vatPortion: this.item.vatAmount,
                loanAccountItemAllocationId: null,
                loanAccountItemId: null,
                loanAccountId: this.params.loanAccountId,
                customLedgerAccountId: this.params.customLedgerAccountId,
                loanAccountDisplayName: this.params.loanAccountDisplayName,
                isEdited: false
            };

            modalToReturn.push(addLoanAccountItem);

            this.dataService.post(webApi.saveloanAccountItem, { LoanAccountItems: modalToReturn }).subscribe((data: any) => {
                this.notificationBarService.success(this.saveSuccessMessage);
                this.activeModal.close(this.item.createdDate);
            });
        }
    };

    closeModal() {
        this.activeModal.dismiss(this.closeData);
    }

    ledgerAccountChange(ledgerAccountModel: any) {
        if (this.params.showVat == false) {
            this.calculateInclusiveAmount();
            return;
        }
        this.isLedgerAccountVatable = ledgerAccountModel.isVatable;
        this.calculateInclusiveAmount();
    }

    hasLoanAccountItemBeenEdited() {
        return this.item !== this.loanAccountFormItemCopy;
    };


    enableSaveButton(args: any) {
        this.saveButton = false;
    };

    initTranslation() {
        this.translateService.setDefaultLang('en')
        this.translateService.use('en')
        this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
            this.saveSuccessMessage = msg;
        });

        this.translateService.get('resources.finance-businessloans-label-amount').subscribe((msg: any) => {
            this.Amount = msg;
        });
        this.translateService.get('resources.finance-businessloans-addnew-label-inclusive').subscribe((msg: any) => {
            this.Inclusive = msg;
        });

        this.translateService.get('resources.finance-loanaccounts-message-updatedsuccessfully').subscribe((msg: any) => {
            this.updatedSuccessfully = msg;
        });
    }

    ngOnInit() {
        this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
        this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);

        this.initTranslation();
        this.getData();

    }

}