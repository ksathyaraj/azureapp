import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { supplierInvoiceIntrest } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-add-new-intrest-item",
  templateUrl: "./add-new-intrest-item.component.html"
})
export class AddNewIntrestItemComponent implements OnInit{
  @Input() params = {itemType: ''};
  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private messagingService : MessagingService
  ) {}
  closeData = webConstants.closeData;
  okClick = webConstants.okClick;
  addNewFormDetails:supplierInvoiceIntrest = {
    selectedLedgerAccount: '',
    description: '',
    inclusiveAmount: ''
  };
  ledgerAccounts = [];

  ngOnInit() {
    this.getSupplierInvoiceLedgerAccounts();
  }

  getSupplierInvoiceLedgerAccounts() {
    this.dataService.getLookupData(webApi.getSupplierInvoiceLedgerAccounts + this.params.itemType, true)
      .subscribe((result: any) => {
        this.ledgerAccounts = result.filter((data:any) => { return !data.notAllowed;});
    });
  }
 
  passBack( addNewFormDetails: supplierInvoiceIntrest, addNewForm: NgForm) {
    this.messagingService.broadcastCheckFormValidatity();
    if(!addNewForm.invalid) {
      let selectedAccount:any = this.ledgerAccounts.filter((account:any) => { return addNewFormDetails.selectedLedgerAccount === account.id;})
      selectedAccount = selectedAccount[0];
      const interestItem = {
        id: null,
        description: addNewFormDetails.description,
        category: selectedAccount.displayName,
        ledgerAccountId: selectedAccount.id,
        allocationType: selectedAccount.allocationTypeId,
        amount: addNewFormDetails.inclusiveAmount,
        vat: 0,
        total: addNewFormDetails.inclusiveAmount,
        invoiceInItemType: this.params.itemType,
        isDeleted: false
      };
      this.activeModal.close(interestItem);
    }
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }
}
