import { Component, Input } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "lib-invoice-required-info-modal",
  templateUrl: "./invoice-required-info-modal.component.html",
  styleUrls: ["./invoice-required-info-modal.component.scss"],
})
export class InvoiceRequiredInfoModalComponent {
  supplierInvoice: any='';
  customerInvoice: any='';
  customerInvoices: any;
  supplierInvoices: any;
  supplier: any='';
  customers: any;
  suppliers: any;
  constructor(
    private dataService: DataService,
    private messagingService: MessagingService,
    private activeModal: NgbActiveModal
  ) {}
  @Input() public params: any = {};
  contact: any={};
  form: any;
  requiredInfo: any = {};
  // modalTitle = this.params.modalTitle;
  // contactRelationshipTypes = this.params.contactRelationshipTypes;
  // contactRelationshipType = this.params.contactRelationshipType;
  modalTitle = "";
  contactRelationshipTypes:any = {};
  contactRelationshipType = 0;

  customerChange(contactId: any) {
    if (contactId) {
      this.requiredInfo.contactId = contactId;
      const paramFilters:any = {};
      paramFilters["contactId"] = contactId;
      this.dataService
        .getRecordWithParams(
          webApi.customerInvoicesWithDetails,
          paramFilters
        )
        .subscribe((result: any) => {
          this.customerInvoices = result;
        });
    }
  }

  supplierChange(contactId: any) {
    this.supplierInvoice = {};
    this.supplierInvoices = {};
    
    if (contactId) {
      this.requiredInfo.contactId = contactId;
      const paramFilters:any = {};
      paramFilters["contactId"] = contactId;
      this.dataService
        .getRecordWithParams(
          webApi.supplierInvoicesWithDetails,
          paramFilters
        )
        .subscribe((result: any) => {
          this.supplierInvoices = result;
        });
    }
  }

  getCustomerData() {
    this.dataService
      .getLookupData(webApi.customersWithInvoices, true)
      .subscribe((result: any) => {
        this.customers = result;
      });
  }

  getSuppilerData() {
    this.dataService
      .getLookupData(webApi.suppliersWithInvoices, true)
      .subscribe((result: any) => {
        this.suppliers = result;
      });
  }

  ok(requiredInfoForm:any) {
    this.messagingService.broadcastCheckFormValidatity();

    if (!requiredInfoForm.invalid) {
      this.hydrateModel();
      this.activeModal.close(this.requiredInfo);
    }
  }

  cancel() {
    this.requiredInfo = {};
    this.activeModal.dismiss();
  }

  hydrateModel() {
    this.requiredInfo.contactRelationshipType = this.contactRelationshipType;

    switch (this.contactRelationshipType) {
      case this.contactRelationshipTypes.customer:
        this.requiredInfo.invoiceOutId = this.customerInvoice.id;
        break;
      case this.contactRelationshipTypes.supplier:
        this.requiredInfo.invoiceInId = this.supplierInvoice.id;
        break;

      default:
    }
  }

  ngOnInit() {
    this.modalTitle = this.params.modalTitle;
    this.contactRelationshipTypes = this.params.contactRelationshipTypes;
    this.contactRelationshipType = this.params.contactRelationshipType;
    switch (this.contactRelationshipType) {
      case this.contactRelationshipTypes.customer:
        this.getCustomerData();
        break;
      case this.contactRelationshipTypes.supplier:
        this.getSuppilerData();
        break;

      default:
    }
  }
}
