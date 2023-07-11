import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { CreditItem } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";

@Component({
  selector: "lib-add-creditnote-item-modal",
  templateUrl: "./add-creditnote-item-modal.component.html",
})
export class AddCreditnoteItemModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private messagingService: MessagingService,
    private vatService: VatService,
    private translateService: TranslateService
  ) { }
  @Input() public params: any = {};
  closeData = webConstants.closeData;
  
  itemTypeNotDefinedMessage = '';
  form = {};
  displayQuantity = {};
  showVat: any;
  vatRate: any;
  isVatRegistered = false;
  itemTypeDescription: any;
  itemType: any;
  creditNoteItemType: any;
  invoiceOutItem: any;
  creditNoteItem: any;
  invoiceOutItemTypes: any
  item: any;
  
  ngOnInit() {
    this.showVat = this.params.showVat;
    this.vatRate = this.params.vatRate;
    this.isVatRegistered = this.params.isVatRegistered;
    this.itemTypeDescription = this.params.itemTypeDescription;
    this.itemType = this.params.itemType;
    this.creditNoteItemType = this.params.creditNoteItemType;
    this.invoiceOutItem = this.params.invoiceOutItem;
    this.creditNoteItem = this.params.creditNoteItem;
    this.invoiceOutItemTypes = this.params.invoiceOutItemTypes;    
     this.initTranslation();
     this.init();
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }
  passBack(form: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!form.invalid) {
      const quantity = (this.creditNoteItem.quantity == 0 ? 1 : this.creditNoteItem.quantity);
       this.item = {
        id: 0,
        invoiceOutItemId: this.invoiceOutItem.id,
        description: this.creditNoteItem.description,
        quantity: quantity,
        displayQuantity: (this.creditNoteItem.quantity == 0 ? this.displayQuantity : this.creditNoteItem.quantity.toString()),
        unitPrice: this.creditNoteItem.unitPrice,
        amount: this.creditNoteItem.amount,
        vat: this.vatService.roundToMoney(this.creditNoteItem.vat),
        total: this.creditNoteItem.total,
        itemType: this.creditNoteItemType,
        isDeleted: false
      };
          this.activeModal.close(this.item);
    }
  }

  isNumber(n:any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
  }

  calculateSummary() {
            const quantity = this.isNumber( this.creditNoteItem.quantity) ?  this.creditNoteItem.quantity : 0;
            const unitPrice = this.isNumber( this.invoiceOutItem.unitPrice) ?  this.invoiceOutItem.unitPrice : 0.0;
            const invoiceItemVat = this.isNumber( this.invoiceOutItem.vat) ?  this.invoiceOutItem.vat : 0.0;

             this.creditNoteItem.amount = this.vatService.roundToMoney(unitPrice * quantity);
             this.creditNoteItem.vat = (invoiceItemVat != 0) ? this.vatService.calculateVat( this.isVatRegistered,  this.vatRate,  this.creditNoteItem.amount) : 0.0;
             this.creditNoteItem.total = this.vatService.roundToMoney( this.creditNoteItem.amount +  this.creditNoteItem.vat);
  }
setCreditNoteValuesToInvoiceOut() {
  this.creditNoteItem.quantity = { ...this.invoiceOutItem.quantity };
  this.creditNoteItem.unitPrice = { ...this.invoiceOutItem.unitPrice };
             this.creditNoteItem.amount =  { ...this.invoiceOutItem.amount };
             this.creditNoteItem.vat =  { ...this.invoiceOutItem.vat };
             this.creditNoteItem.total =  { ...this.invoiceOutItem.total };
}
  
  init() {
            switch ( this.itemType) {
                case  this.invoiceOutItemTypes.discountItem:
                     this.displayQuantity = 'Discount';
                    this.setCreditNoteValuesToInvoiceOut();
                    break;
                case  this.invoiceOutItemTypes.interestItem:
                     this.displayQuantity = 'Interest';
                    this.setCreditNoteValuesToInvoiceOut();
                    break;
                case  this.invoiceOutItemTypes.salesItem:
                     this.displayQuantity =  this.creditNoteItem.quantity.toString();
                    break;

                default:
                     this.displayQuantity = this.itemTypeNotDefinedMessage;
            }

  }
  
  initTranslation() {
    this.translateService.get('resources.finance-invoicing-creditnote-modals-controller-itemtypenotdefined').subscribe((res: string) => {
        this.itemTypeNotDefinedMessage = res;
    });
  }
}
