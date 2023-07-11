import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
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
import { ownersMoneyLoanAccountItem } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
    selector: "lib-add-owners-money-loan-account-item-modal",
    templateUrl: "./add-owners-money-loan-account-item-modal.component.html",
    styleUrls: ["./add-owners-money-loan-account-item-modal.component.css"],
})

export class AddOwnersMoneyLoanAccountItemModalComponent {
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

    loanAccountFormItemCopy: any;
    loanAccountItem: any;
    showVat = this.params.showVat;
    vatInfo = this.params.vatInfo;
    isVatRegistered = this.params.isVatRegistered;
    item: ownersMoneyLoanAccountItem = {
        createdDate: undefined,
        selectedLedgerAccount: '',
        selectedSupplier: '',
        selectedInvoice: '',
        description: '',
        reference: '',
        vatAmount: 0,
        exclusiveAmount: 0,
        inclusiveAmmount: '',
    };
    openedCreatedDate = false;
    saveButton = false;

    saveSuccessMessage = '';
    modelHeading = '';
    updatedSuccessfully = '';
    inValidSelection = '';
    oldVatDate = null;

    Amount: any;
    Inclusive: any;
    ledgerAccounts: any;
    isLedgerAccountVatable = false;
    vatRate: any;
    suppliers: any;
    supplierInvoices: any;
    datePlaceHolder = webConstants.datePlaceHolderMessage

    dateChanged() {
        if (this.VatDateHasActuallyChanged(this.oldVatDate, this.item.createdDate)) {
            if (this.oldVatDate === null || this.vatService.isStandardVatAmount(this.params.vatInfo, this.oldVatDate, this.item.exclusiveAmount, this.item.vatAmount)) {
                this.oldVatDate = this.item.createdDate;
                //only re-calculate VAT if date has actually changed AND vat was standard Vat prior to the vat date change
                this.setVatRate(this.item.createdDate);
                this.calculateExclusiveAndVatAmounts();
            }
        }
    }

    VatDateHasActuallyChanged(currentDate: any, newDate: any) {

        if ((currentDate === null && newDate === null) || currentDate === newDate)
            return false;
        if ((currentDate === null && newDate !== null) || currentDate !== newDate)
            return true;
        return;

    }

    setVatRate(date?: any) {
        this.vatRate = this.vatService.getVatRate(this.params.vatInfo, date);
    }

    getData() {
        this.dataService.getLookupData(webApi.ledgerAccounts).subscribe((data: any) => {
            this.ledgerAccounts = data.filter((c: any) => !c.notAllowed);
            this.init();
        });
    }

    init() {
        if (this.params.loanAccountItemId > 0) {
            this.dataService.getRecord(webApi.loanAccountItem + this.params.loanAccountItemId).subscribe((data: any) => {
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
            this.getSuppliers(data.contactId);
            this.getSupplierInvoices(data.contactId, data.invoiceInId);
        }

        this.loanAccountFormItemCopy = { ...this.item };
        this.oldVatDate = this.item.createdDate;
    }

    setLedgerAccountDropdown(ledgerAccountId: any) {

        this.item.selectedLedgerAccount = Enumerable.from(this.ledgerAccounts).where((c: any) => {
            return c.id == ledgerAccountId;
        }).singleOrDefault();

        if (this.item.selectedLedgerAccount == null) {
            this.modalService.messageModal(this.modelHeading, this.inValidSelection).result.then(() => {
                this.activeModal.dismiss(this.closeData);
                return;
            });
        } else {
            this.isLedgerAccountVatable = this.item.selectedLedgerAccount.isVatable;
            // This is being set so is either show/hides the vat column.
        }
    }


    calculateExclusiveAndVatAmounts() {
        if (this.item.inclusiveAmmount == null && this.isLedgerAccountVatable != null && this.item.inclusiveAmmount === "")
            return;
        var isVatable = (this.isLedgerAccountVatable && this.params.isVatRegistered);
        this.item.exclusiveAmount = Number(this.vatService.calculateExclusiveAmount(isVatable, this.item.inclusiveAmmount, this.vatRate)).toFixed(2);
        this.item.vatAmount = this.vatService.calculateVat(isVatable, this.vatRate, this.item.exclusiveAmount).toFixed(2);
    };

    calculateExclusiveAmount() {
        if (this.item.inclusiveAmmount == null && this.isLedgerAccountVatable != null && this.item.inclusiveAmmount === "")
            return;
        var isVatable = (this.isLedgerAccountVatable && this.params.isVatRegistered);
        this.item.exclusiveAmount = Number(this.vatService.calculateExclusiveAmountFromInclusiveAndVatAmounts(isVatable, this.item.inclusiveAmmount, this.item.vatAmount)).toFixed(2);
    };

    passBack(frm: any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (!frm.invalid) {
            this.saveButton = true;
            var modalToReturn = [];

            if (this.params.loanAccountItemId > 0) { //Edit Mode
                if (this.hasLoanAccountItemBeenEdited()) {
                    var newLoanAccountItemAllocation = {
                        ledgerAccountId: this.item.selectedLedgerAccount.id,
                        allocationType: this.item.selectedLedgerAccount.allocationTypeId,
                        dateTime: this.dateService.getFormattedDateForWebApi(this.item.createdDate),
                        description: this.item.description,
                        reference: this.item.reference,
                        amount: this.item.exclusiveAmount,
                        vatPortion: this.item.vatAmount,
                        contactId: this.item.selectedSupplier,
                        invoiceInId: this.item.selectedInvoice,
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
                        reversalLoanAccountItemAllocation.contactId = this.loanAccountItem.contactId,
                        reversalLoanAccountItemAllocation.invoiceInId = this.loanAccountItem.invoiceInId,
                        reversalLoanAccountItemAllocation.isEdited = true;

                    modalToReturn.push(reversalLoanAccountItemAllocation);

                    this.dataService.post(webApi.addLoanAccountItem, { LoanAccountItems: modalToReturn }).subscribe((data: any) => {
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
                contactId: this.item.selectedSupplier,
                invoiceInId: this.item.selectedInvoice,
                loanAccountItemAllocationId: null,
                loanAccountItemId: null,
                loanAccountId: this.params.loanAccountId,
                customLedgerAccountId: this.params.customLedgerAccountId,
                loanAccountDisplayName: this.params.loanAccountDisplayName,
                isEdited: false
            };

            modalToReturn.push(addLoanAccountItem);

            this.dataService.post(webApi.addLoanAccountItem, { LoanAccountItems: modalToReturn }).subscribe((data: any) => {
                this.notificationBarService.success(this.saveSuccessMessage);
                this.activeModal.close(this.item.createdDate);
            });
        }
    };

    closeModal() {
        this.activeModal.dismiss(this.closeData);
    }

    ledgerAccountChange(ledgerAccountModel: any) {
        if (this.params.showVat) {

            this.isLedgerAccountVatable = ledgerAccountModel.isVatable;
        }
        this.calculateExclusiveAndVatAmounts();

        this.item.selectedSupplier = '';
        this.item.selectedInvoice = '';
        if (ledgerAccountModel.isYouPaidASupplierDefaultLedger) {
            this.getSuppliers();
        }
    }

    supplierChange(supplierId: any) {
        this.getSupplierInvoices(supplierId);
    }

    getSuppliers(selectedSupplierId?: any) {
        const url = (this.params.loanAccountItemId === undefined) ? webApi.suppliersFiltered : webApi.suppliers;
        this.dataService.getLookupData(url, true).subscribe((data: any) => { //Filter Supplier if in Add Mode
            this.suppliers = data;
            if (selectedSupplierId != null) {
                this.item.selectedSupplier = selectedSupplierId;
            }
        });
    }

    getSupplierInvoices(supplierId: any, selectedInvoiceId?: any) {
        if (supplierId == null) {
            return;
        }

        this.dataService.getLookupData(webApi.supplierInvoices + supplierId, true).subscribe((data: any) => {
            this.supplierInvoices = data;
            if (selectedInvoiceId != null) {
                this.item.selectedInvoice = selectedInvoiceId;
            }
        });
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

        this.translateService.get('resources.finance-ownersmoney-addnew-label-category').subscribe((msg: any) => {
            this.modelHeading = msg;
        });
        this.translateService.get('resources.finance-ownersmoney-invalidselection').subscribe((msg: any) => {
            this.inValidSelection = msg;
        });
        this.translateService.get('resources.finance-ownersmoney-addnew-label-amount').subscribe((text: any) => {
            this.Amount = text;
        });
        this.translateService.get('resources.finance-ownersmoney-addnew-label-inclusive').subscribe((text: any) => {
            this.Inclusive = text;
        });

        this.translateService.get('resources.finance-ownersmoney-addownersmoneyloanaccountitem-message-updatedsuccessfully').subscribe((msg: any) => {
            this.updatedSuccessfully = msg;
        });
    }

    ngOnInit() {
        this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
        this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);

        this.initTranslation();
        this.getData();
        this.setVatRate();
    }

}