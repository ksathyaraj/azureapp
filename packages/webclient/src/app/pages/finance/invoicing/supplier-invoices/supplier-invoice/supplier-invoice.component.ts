import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { invoiceInItems, supplierInvoiceDetails } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "web-supplier-invoice",
  templateUrl: "./supplier-invoice.component.html",
  styleUrls: ["./supplier-invoice.component.scss"],
})
export class SupplierInvoiceComponent implements OnInit{

  constructor(private dataService: DataService, private navigationService: NavigationService, private notificationService: NotificationBarService, private translateService: TranslateService, private messagingService : MessagingService, private activatedRoute: ActivatedRoute, private modalService: ModalService, private router: Router, private dateService: DateService, private vatService: VatService) {
    this.activatedRoute.params.subscribe(params => {
      this.supplierInvoiceId = parseInt(params['id']);
    });
  }

  supplierInvoiceDetails:supplierInvoiceDetails = {
    supplierInvoiceId: 1,
    contactId: '',
    supplierInvoiceNumber: '',
    sourceDocumentReference: '',
    createdDate: undefined,
    payByDate: undefined,
    total: NaN,
    subTotal: NaN,
    totalDiscount: NaN,
    totalVat: NaN,
    comments: '',
    invoiceInItems: []
  };
  supplierInvoiceId = 0;

  suppliers = [];
  vatInfo = {
    vatRateItems: [],
    vatRate: '',
    showVat: false,
    isVatRegistered: false
  };
  invoiceInItemTypes:any = [];
  showVat = false;
  // invoiceInItems: any = [];
  addSupplier = '';
  addSupplierMessage = '';
  addConfirmDeleteMessage = '';
  saveSuccessMessage = '';
  addItemMessage = '';
  vatRate:any;
  isVatRegistered = false;

  ngOnInit() {
    this.getSuppliers();
    this.getVatInfo();
    this.getInvoiceInItemTypes();
    if(this.supplierInvoiceId !== 0) {
      this.getSupplierInvoice();
    }
    this.getTranslation();
  }

  getSuppliers() {
    this.dataService
      .getLookupData(webApi.getSuppliers, true)
      .subscribe((data: any) => {
        this.suppliers = data;
        if(data === undefined || data.length === 0){
          this.modalService.messageModal(this.addSupplier, this.addSupplierMessage).result.then(() => {
            this.router.navigateByUrl('/contacts/organisations/0');
          });
        }
      });
  }

  getVatInfo() {
    this.dataService
      .getLookupData(webApi.getVatInfo, true)
      .subscribe((data: any) => {
        this.vatInfo = data;
        this.showVat = this.vatInfo.showVat;
        this.isVatRegistered = this.vatInfo.isVatRegistered;
      });
  }

  getInvoiceInItemTypes() {
    this.dataService
      .getLookupData(webApi.getInvoiceInItemTypes, true)
      .subscribe((data: any) => {
        this.invoiceInItemTypes = data;
      });
  }

  getSupplierInvoice() {
    this.dataService
      .getRecord(webApi.getSupplierInvoices + '/' + this.supplierInvoiceId)
      .subscribe((data:any)=> {
        this.supplierInvoiceDetails = data;
      });
  }

  getVatRate() {
    this.vatRate = this.vatService.getVatRate(this.vatInfo, this.supplierInvoiceDetails.createdDate);
    return this.vatRate;
  }

  save(supplierInvoiceDetails: any,addsupplierInvoiceForm: NgForm) {
    this.messagingService.broadcastCheckFormValidatity();
    if(!addsupplierInvoiceForm.invalid) {
      if (supplierInvoiceDetails.invoiceInItems.length <= 0) {
        this.notificationService.error(this.addItemMessage);
        return;
      }
      supplierInvoiceDetails.createdDate = this.dateService.getFormattedDateForWebApi(supplierInvoiceDetails.createdDate);
      supplierInvoiceDetails.payByDate = this.dateService.getFormattedDateForWebApi(supplierInvoiceDetails.payByDate);
      this.dataService
        .post(webApi.postSupplierInvoice, this.supplierInvoiceDetails)
        .subscribe(() => {
          this.notificationService.success(this.saveSuccessMessage);
          this.dataService.invalidateRouteCache(webApi.getSupplierInvoices);
          this.navigationService.goToParentState();
      });
    }
  }

  deleteItem(item: any, index: any) {
    if(item) {
      this.modalService.confirmDelete(this.addConfirmDeleteMessage + ': ' +  item.description + '?').result.then((data: any) => {
        if (item.id != null) {
          item.isDeleted = true;
      } else {
          this.supplierInvoiceDetails.invoiceInItems.splice(index, 1);
        }
        this.calculateSummary();
      })
    }
  }

  calculateSummary() {
    let salesItemsTotal = 0;
    this.supplierInvoiceDetails.invoiceInItems.map((c:invoiceInItems) => {
      if(c.invoiceInItemType == this.invoiceInItemTypes.salesItem && c.isDeleted != true) {
        salesItemsTotal = salesItemsTotal + Number(c.amount);
        return c.amount; 
      }
      return;
    });
    let interestItemTotal = 0;
    this.supplierInvoiceDetails.invoiceInItems.map((c:invoiceInItems) => {
      if(c.invoiceInItemType == this.invoiceInItemTypes.interestItem && c.isDeleted != true) {
        interestItemTotal = interestItemTotal + Number(c.amount);
        return c.amount; 
      }
      return;
    });
    let discountItemsTotal = 0;
    this.supplierInvoiceDetails.invoiceInItems.map((c:invoiceInItems) => {
      if(c.invoiceInItemType == this.invoiceInItemTypes.discountItem && c.isDeleted != true) {
        discountItemsTotal = discountItemsTotal + Number(c.amount);
        return c.amount; 
      }
      return;
    });
    let salesItemVatTotal = 0;
    this.supplierInvoiceDetails.invoiceInItems.map((c:invoiceInItems) => {
      if(c.invoiceInItemType == this.invoiceInItemTypes.salesItem && c.isDeleted != true) {
        salesItemVatTotal = salesItemVatTotal + Number(c.vat);
        return c.amount; 
      }
      return;
    });
    let discountItemVatTotal = 0;
    this.supplierInvoiceDetails.invoiceInItems.map((c:invoiceInItems) => {
      if(c.invoiceInItemType == this.invoiceInItemTypes.discountItem && c.isDeleted != true) {
        discountItemVatTotal = discountItemVatTotal + Number(c.vat);
        return c.amount; 
      }
      return;
    });
    this.supplierInvoiceDetails.subTotal = salesItemsTotal + interestItemTotal;
    this.supplierInvoiceDetails.totalDiscount = Math.abs(discountItemsTotal);
    this.supplierInvoiceDetails.totalVat = salesItemVatTotal - Math.abs(discountItemVatTotal);
    this.supplierInvoiceDetails.total = (salesItemsTotal + salesItemVatTotal + interestItemTotal) - (Math.abs(discountItemsTotal) + Math.abs(discountItemVatTotal));
  }
  
  createdDateChange(date:any) {
    const oldVatRate = this.vatRate;
    this.getVatRate();
    if (oldVatRate !== 0 && oldVatRate !== this.vatRate && this.isVatRegistered === true && this.supplierInvoiceDetails.invoiceInItems.length > 0){
        this.modalService.messageModal("VAT Rate Changed", "The VAT rate used on the supplier invoice changed because you changed the date of the supplier invoice. Please ensure that if you've already captured line items  that they are using the correct VAT %");
    }
  }

  addInterestItem() {
    const params = {
      itemType: this.invoiceInItemTypes.interestItem
    };
    this.modalService.addIntrestItem(params).result.then((interestItem: any) => {
      this.supplierInvoiceDetails.invoiceInItems.push(interestItem);
      this.calculateSummary();
    });
  }

  addSalesItem() {
    const params = {
      itemType: this.invoiceInItemTypes.salesItem,
      isVatRegistered: this.isVatRegistered,
      vatRate: this.getVatRate(),
      title: 'resources.finance-invoicing-supplierinvoices-accountitem-heading-addaccountitem',
      currentPage: 1
    };
    this.modalService.addDiscountOrSalesItem(params).result.then((data: any) => {
      this.supplierInvoiceDetails.invoiceInItems.push(data);
      this.calculateSummary();
    });
  }

  addDiscountItem() {
    const params = {
      itemType: this.invoiceInItemTypes.discountItem,
      isVatRegistered: this.isVatRegistered,
      vatRate: this.getVatRate(),
      title: 'resources.finance-invoicing-supplierinvoices-discountitem-heading-adddiscountitem',
      currentPage: 2
    };
    this.modalService.addDiscountOrSalesItem(params).result.then((data: any) => {
      this.supplierInvoiceDetails.invoiceInItems.push(data);
      this.calculateSummary();
    });
  }

  getTranslation() {
    this.translateService.get('resources.finance-invoicing-supplierinvoices-addsupplier-heading-addsupplier').subscribe((res: string) => {
      this.addSupplier = res;
    });
    this.translateService.get('resources.finance-invoicing-supplierinvoices-addsupplier-message').subscribe((res: string) => {
      this.addSupplierMessage = res;
    });
    this.translateService.get('resources.finance-invoicing-supplierinvoices-confirmdeletemessage').subscribe((res: string) => {
      this.addConfirmDeleteMessage = res;
    });
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((res: string) => {
      this.saveSuccessMessage = res;
    });
    this.translateService.get('resources.finance-invoicing-supplierinvoices-additem-heading-additem').subscribe((res: string) => {
      this.addItemMessage = res;
    });
  }
}
