import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { supplierInvoiceIntrest } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";

@Component({
  selector: "lib-add-discount-item",
  templateUrl: "./add-discount-item.component.html"
})
export class AddDiscountItemComponent implements OnInit {
  @Input() params = {itemType: '', currentPage: 1, isVatRegistered: false, vatRate: 0, title: ''};
  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private vatService: VatService,
    private translateService: TranslateService,
    private messagingService : MessagingService
  ) {}
  closeData = webConstants.closeData;
  okClick = webConstants.okClick;
  addNewFormDetails: supplierInvoiceIntrest = {
    selectedLedgerAccount: "",
    description: "",
    inclusiveAmount: "",
    vatAmount: 0,
    exclusiveAmount: 0,
  };
  ledgerAccounts = [];
  isLedgerAccountVatable = "";
  amountLabel = "";
  inclusiveLabel = "";

  ngOnInit() {
    this.getSupplierInvoiceLedgerAccounts();
    this.getTranslation();
  }

  getSupplierInvoiceLedgerAccounts() {
    this.dataService
      .getLookupData(
        webApi.getSupplierInvoiceLedgerAccounts + this.params.itemType,
        true
      )
      .subscribe((result: any) => {
        this.ledgerAccounts = result.filter((data: any) => {
          return !data.notAllowed;
        });
    });
  }

  calculateInclusiveAmount() {
    if (
      this.addNewFormDetails.inclusiveAmount == null &&
      this.isLedgerAccountVatable != null &&
      this.addNewFormDetails.inclusiveAmount === ""
    )
      return;

    const isVatable =
      this.isLedgerAccountVatable && this.params.isVatRegistered;
    this.addNewFormDetails.exclusiveAmount =
      this.vatService.calculateExclusiveAmount(
        isVatable,
        this.addNewFormDetails.inclusiveAmount,
        this.params.vatRate
      );
    this.addNewFormDetails.exclusiveAmount = Number(this.addNewFormDetails.exclusiveAmount).toFixed(2);  
    this.addNewFormDetails.vatAmount = this.vatService.calculateVat(
      isVatable,
      this.params.vatRate,
      this.addNewFormDetails.exclusiveAmount
    );
    this.addNewFormDetails.vatAmount = this.addNewFormDetails.vatAmount.toFixed(2);
  }

  ledgerAccountChange() {
    if (this.params.isVatRegistered) {
      const selectedAccount = this.getSelectedAccount(
        this.addNewFormDetails.selectedLedgerAccount
      );
      this.isLedgerAccountVatable = selectedAccount.isVatable;
    }
    this.calculateInclusiveAmount();
  }

  vatAmountChange() {
    if (
      this.addNewFormDetails.inclusiveAmount == null &&
      this.isLedgerAccountVatable != null &&
      this.addNewFormDetails.inclusiveAmount === ""
    )
      return;

    const isVatable =
      this.isLedgerAccountVatable && this.params.isVatRegistered;
    this.addNewFormDetails.exclusiveAmount =
      this.vatService.calculateExclusiveAmountFromInclusiveAndVatAmounts(
        isVatable,
        this.addNewFormDetails.inclusiveAmount,
        this.addNewFormDetails.vatAmount
      );
    this.addNewFormDetails.exclusiveAmount = Number(this.addNewFormDetails.exclusiveAmount).toFixed(2);  
  }

  getSelectedAccount(selectedLedgerAccount: string) {
    const selectedAccount: any = this.ledgerAccounts.filter((account: any) => {
      return selectedLedgerAccount === account.id;
    });
    return selectedAccount[0];
  }

  passBack(addNewFormDetails: supplierInvoiceIntrest, addNewForm: NgForm) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!addNewForm.invalid) {
      const selectedAccount = this.getSelectedAccount(
        addNewFormDetails.selectedLedgerAccount
      );
      if(this.params.currentPage === 1) {
        const salesItem = {
          id: null,
          description: addNewFormDetails.description,
          category: selectedAccount.displayName,
          ledgerAccountId: selectedAccount.id,
          allocationType: selectedAccount.allocationTypeId,
          amount: addNewFormDetails.exclusiveAmount,
          vat: addNewFormDetails.vatAmount,
          total: addNewFormDetails.inclusiveAmount,
          invoiceInItemType: this.params.itemType,
          isDeleted: false,
        };
        this.activeModal.close(salesItem);
      } else {
        const discountItem = {
          id: null,
          description: addNewFormDetails.description,
          category: selectedAccount.displayName,
          ledgerAccountId: selectedAccount.id,
          allocationType: selectedAccount.allocationTypeId,
          amount: Number(addNewFormDetails.exclusiveAmount) * -1,
          vat: Number(addNewFormDetails.vatAmount) * -1,
          total: Number(addNewFormDetails.inclusiveAmount) * -1,
          invoiceInItemType: this.params.itemType,
          isDeleted: false,
        };
        this.activeModal.close(discountItem);
      }
    }
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getTranslation() {
    this.translateService
      .get(
        "resources.finance-invoicing-supplierinvoices-discountitem-label-amount"
      )
      .subscribe((res: string) => {
        this.amountLabel = res;
      });
    this.translateService
      .get(
        "resources.finance-invoicing-supplierinvoices-discountitem-label-inclusive"
      )
      .subscribe((res: string) => {
        this.inclusiveLabel = res;
      });
  }
}
