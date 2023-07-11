import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from "linq";
import { CreditNote, CreditNoteItemTypes, InvoiceOutItemTypes } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { InvoicingDataService } from "packages/shared-lib/src/lib/services/invoicing-data.service";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { Subscription } from "rxjs";

@Component({
  selector: "web-credit-note",
  templateUrl: "./credit-note.component.html",
  styleUrls: ["./credit-note.component.scss"],
})
export class CreditNoteComponent {
  contact: any;
  individualContact: any;
  project: any | undefined;
  bankDetail: any;
  routeSub: Subscription | undefined;

  constructor(private dataService: DataService, private vatService: VatService, private lookupDataService: LookupDataService, private modalService: ModalService, private messagingService : MessagingService, private invoicingDataService : InvoicingDataService, private notificationBarService : NotificationBarService, private navigation : NavigationService, private translateService: TranslateService,private route: ActivatedRoute) { }
  warnmessage = true;
  showVat = false;
  saveButton = false; // vm.enableSavebutton
  isVatRegistered = true;
  typeDescription = '';
  savesuccessmessage = '';
  confirmDeleteMessage = '';
  modalHeading = '';
  creditNoteId: any;
  invoiceOutId: any;
  companyProfile: any;
  vatInfo: any;
  companyProfileImage: any;
  vatRate: any;
  bankingDetail: any;

  creditNote: CreditNote = {
  bankingDetailsId: 0,
  comments: "",
  contactId: 0,
  creditNoteItems: [],
  creditNoteNumber: 0,
  dateIssued: undefined,
  formattedCreditNoteNumber: null,
  Id: 0,
  individualContactId: 0,
  invoiceOutId: 0,
  invoiceOutItems: [],
  orderNumber: "",
  projectId: null,
  subTotal: 0,
  supplierNumber: null,
  total: 0,
  totalAmount: 0,
  totalDiscount: 0,
  totalVat: 0,
  vatNumber : null
  
  }

  creditNoteItemTypes: CreditNoteItemTypes = {
    creditNoteInvoiceOutItem: 0,
    discountItem : 0
  }

  invoiceOutItemTypes: InvoiceOutItemTypes = {
    discountItem: 0,
    interestItem: 0,
    salesItem : 0
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
    this.creditNoteId = parseInt(params['creditNoteId']);
    this.invoiceOutId = parseInt(params['invoiceOutId']);
  });
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.initTranslation();
    this.getData(true, true);
    this.creditNote.creditNoteItems = [];
  }

  enableSaveButton(args:any) {
      this.saveButton = false;
  }

  getData(refresh: boolean, hideOverlay: boolean) {
    this.dataService.getLookupData(webApi.companyProfile, refresh, hideOverlay).subscribe((response: any) => {
      this.companyProfile = response;
    });
    this.dataService.getLookupData(webApi.invoiceOutItemTypes, refresh, hideOverlay).subscribe((response: any) => {
      this.invoiceOutItemTypes = response;
    });
    this.dataService.getLookupData(webApi.creditNoteItemTypes, refresh, hideOverlay).subscribe((response: any) => {
      this.creditNoteItemTypes = response;
    });
    this.dataService.getLookupData(webApi.getVatInfoFilePath, refresh, hideOverlay).subscribe((response: any) => {
      this.vatInfo = response;
      this.showVat = this.vatInfo.showVat;
      this.isVatRegistered = this.vatInfo.isVatRegistered;
    });
    this.dataService.getLookupData(webApi.companyProfileImage, refresh, hideOverlay).subscribe((response: any) => {
      this.companyProfileImage = response;
    });
    this.setupCreditNote(refresh);
    this.checkStartingDetails(this.companyProfile,true,true);
    // this.setupCreditNote(refresh).then(function() {
    //   this.checkStartingDetails(this.companyProfile);
    // });
  }

  setVatRate(vatInfo: any, date: any) {
    this.vatRate = this.vatService.getVatRate(vatInfo, date);
  }
  getRelatedData(refresh: any) {
    this.dataService.getLookupData(webApi.getBankingDetail + this.creditNote.bankingDetailsId, refresh).subscribe((response: any) => {
      this.bankingDetail = response;
    });
    this.dataService.getLookupData(webApi.invoiceablecontacts+'/'+this.creditNote.contactId, refresh).subscribe((response: any) => {
      this.contact = response;
      this.init();
      this.calculateSummary();
    });
    
    
  }

  setupCreditNote(refresh: any) {
    let returnVal;
    if (this.creditNoteId === 0 && this.invoiceOutId !== 0) {
      returnVal = this.dataService.getRecord(webApi.addcreditNote + this.invoiceOutId + '/add').subscribe((response: any) => {
        this.creditNote = response;
        this.setVatRate(this.vatInfo, response.dateIssued);
        this.getRelatedData(refresh);
      });
    } else if (this.creditNoteId !== 0 && this.invoiceOutId === 0) {   
      returnVal = this.dataService.getRecord(webApi.creditNote+'/' + this.creditNoteId).subscribe((response: any) => {
        this.creditNote = response;
        this.setVatRate(this.vatInfo, response.dateIssued);
        this.getRelatedData(refresh);
      });
    }
    return returnVal;
  }

  checkStartingDetails(companyProfile: any, refresh: boolean, hideOverlay: boolean) {
    let response;
    if (companyProfile?.creditNoteStartingDetailSet === false) {
      //bring up quote starting details modal
      this.modalService.genericStartingDetailsModal(companyProfile.creditNotePrefix, companyProfile.creditNoteNumber || 1).result.then(function (result: any) {
        //save quote starting details here
        response = result;
      });
      this.dataService.post(webApi.saveCreditNoteStartingDetails + response);
      this.dataService.getLookupData(webApi.companyProfile, refresh, hideOverlay);
    }
  }
  
  print(id: any) {
    this.dataService.getReport(webApi.pdfCreditNote + id).then((dataUrl) => {
      this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
    });
  }
  
  addCreditNoteItem(invoiceOutItem: any) {

    let creditNoteItemType = 0;
    let itemCredited;
    switch (invoiceOutItem.itemType) {
      case this.invoiceOutItemTypes.discountItem:
        this.typeDescription = 'Discount Item';
        creditNoteItemType = this.creditNoteItemTypes.discountItem;
        itemCredited = this.isItemFullyCreditedByItem(invoiceOutItem) ? true : false;
        // if (this.isItemFullyCreditedByItem(invoiceOutItem)) 
        //   return true ;
        break;
      case this.invoiceOutItemTypes.interestItem:
        this.typeDescription = 'Interest Item';
        creditNoteItemType = this.creditNoteItemTypes.creditNoteInvoiceOutItem;
        itemCredited = this.isItemFullyCreditedByItem(invoiceOutItem) ? true : false;
        break;
      case this.invoiceOutItemTypes.salesItem:
        this.typeDescription = 'Sales Item';
        creditNoteItemType = this.creditNoteItemTypes.creditNoteInvoiceOutItem;
        itemCredited = this.isItemFullyCreditedByItem(invoiceOutItem) ? true : false;
        break;
      default:
        this.typeDescription = "Item Type Not Defined";
    }
const params = {
                invoiceOutItem: invoiceOutItem,
                creditNoteItem:  {...invoiceOutItem},
                quantityBalance: this.getQuantityBalance(invoiceOutItem),
                invoiceOutItemTypes: this.invoiceOutItemTypes,
                itemTypeDescription: this.typeDescription,
                itemType: invoiceOutItem.itemType,
                creditNoteItemType: creditNoteItemType,
                showVat: this.showVat,
                vatRate: this.vatRate,
                isVatRegistered: this.vatInfo.isVatRegistered
              };
    this.modalService.addCreditNoteItemModal(params).result.then((creditNoteItem : any ) => {
       this.creditNote.creditNoteItems.push(creditNoteItem);
       if (this.creditNote.creditNoteItems.length !== 0) {
          this.warnmessage = true;
        } 
       this.calculateSummary();
    })
    return itemCredited;
  }

  deleteItem(item: any, index: any) {
    if (item) {
      this.modalService.confirmDelete(this.confirmDeleteMessage + ':' + item.description + '?').result.then(() => {
         this.creditNote.creditNoteItems.splice(index, 1);
        if (this.creditNote.creditNoteItems.length === 0) {
          this.warnmessage = false;
        }
         this.calculateSummary();
      })
    }
  }

  save(creditNote: any, form: any) { 
    if (this.creditNote.creditNoteItems.length === 0) {
          this.warnmessage = false;
    } else {
      this.messagingService.broadcastCheckFormValidatity();
    if (!form.invalid) { 
        this.saveButton = true;
      let i = 1;
      this.creditNote.creditNoteItems.forEach((element:any) => {
         element.displayOrder = i;
         i++;
      });
      this.dataService.post(webApi.saveCreditNote,creditNote).subscribe((result: any) => {
                    this.creditNoteId = result.value;
                    this.creditNote.Id = this.creditNoteId;
                    this.notificationBarService.success(this.savesuccessmessage);
                    this.dataService.invalidateRouteCache(webApi.creditnotes);
                    this.dataService.invalidateRouteCache(webApi.invoicesoutRoute);
                    this.navigation.goToCreditNotes();
      })
    }
  }
}

  calculateSummary() {
//   const buttonSetting: any = Enumerable.from(this.countryDashboardSettings).where((c: any) => { return c.dashboardButton.toLowerCase() === dashboardButton.toLowerCase(); }).singleOrDefault();
 
  const salesItemsTotal:any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.itemType === this.creditNoteItemTypes.creditNoteInvoiceOutItem; }).sum((c: any) => { return c.amount; })
  const discountItemsTotal:any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.itemType === this.creditNoteItemTypes.discountItem; }).sum((c: any) => { return c.amount; })
  const salesItemVatTotal:any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.itemType === this.creditNoteItemTypes.creditNoteInvoiceOutItem; }).sum((c: any) => { return c.vat; })
  const discountItemVatTotal:any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.itemType === this.creditNoteItemTypes.discountItem; }).sum((c: any) => { return c.vat; })


            this.creditNote.subTotal = salesItemsTotal;
            this.creditNote.totalDiscount = Math.abs(discountItemsTotal);
            this.creditNote.totalVat = salesItemVatTotal - Math.abs(discountItemVatTotal);
            this.creditNote.total = (salesItemsTotal + salesItemVatTotal) - (Math.abs(discountItemsTotal) + Math.abs(discountItemVatTotal));

  }

  getQuantityBalance(item: any) {
    const itemQuantityTotal: any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.invoiceOutItemId === item.id; }).sum((c: any) => { return c.quantity; });
      return item.quantity - itemQuantityTotal;
  }

   isItemFullyCreditedByQuantity(item: any) {
     const itemQuantityTotal: any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.invoiceOutItemId === item.id; }).sum((c: any) => { return c.quantity; });
      return itemQuantityTotal == item.quantity ? true : false;
   }
  
   isItemFullyCreditedByItem(item: any) {
     const itemTotal: any = Enumerable.from(this.creditNote.creditNoteItems).where((c: any) => { return c.invoiceOutItemId === item.id; }).count();
     return itemTotal >= 1 ? true : false;
   }
  
  init() {
    this.individualContact = Enumerable.from(this.contact.invoiceableIndividualContacts).where((c: any) => { return c.id === this.creditNote.individualContactId; }).singleOrDefault();
    this.project = Enumerable.from(this.contact.invoiceableProjects).where((c: any) => { return c.id === this.creditNote.projectId; }).singleOrDefault();
    this.bankDetail = Enumerable.from(this.bankingDetail).where((c: any) => { return c.id === this.creditNote.bankingDetailsId; }).singleOrDefault();
    if (this.creditNote.creditNoteItems == null)
      this.creditNote.creditNoteItems = [];
    
  }

  initTranslation() {
    this.translateService.get('resources.finance-invoicing-creditnotes-pdfmodal-header-creditnotereport').subscribe((res: string) => {
      this.modalHeading = res;
    });
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((res: string) => {
      this.savesuccessmessage = res;
    });
     this.translateService.get('resources.finance-quotes-pricelist-deleteconfirmmessage').subscribe((res: string) => {
      this.confirmDeleteMessage = res;
    });
  }
  
  
}