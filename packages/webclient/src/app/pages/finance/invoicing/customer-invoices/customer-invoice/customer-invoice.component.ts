import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from "linq";
import { Router } from "@angular/router";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { InvoicingDataService } from "packages/shared-lib/src/lib/services/invoicing-data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "web-customer-invoice",
  templateUrl: "./customer-invoice.component.html",
  styleUrls: ["./customer-invoice.component.scss"],
})
export class CustomerInvoiceComponent {


  constructor(
    private dateService: DateService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private messagingService: MessagingService,
    private modalService: ModalService,
    private notificationBarService: NotificationBarService,
    private invoicingDataService: InvoicingDataService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.customerInvoiceId = parseInt(params['id']);
    });
  }

  customerInvoice: any = {
    invoiceOutItems: [],
    contact: '',
    projectId: '',
    totalDiscount: 0,
    totalVat: 0,
    total: 0,
    subTotal: 0,
  };
  disabled = false;
  customerInvoiceId = 0;
  itemEditMode: any;
  bankingDetails: any;
  companyProfileImage: any;
  companyProfile: any = { companyDisplayName: '', }
  enableSaveButton = false;
  showVat = false;
  vatInfo: any;
  isVatRegistered: any;
  vatRate: any;
  customers: any;
  invoiceOutItemTypes: any = [];
  newCustomer = { id: "0", companyName: "Add New Customer" };
  newContact = { id: "0", fullName: "Add New Contact" };
  productlist = [];

  private formattedInvoiceNumber = '';
  private saveSuccessMessage = '';
  private emailModelHeading = '';
  private modalHeadingReport = '';

  emailInvoice(customerInvoiceId: any) {
    this.dataService.getReport(webApi.PDFCustomerInvoice + '/' + customerInvoiceId).then((pdfUrl) => {
      this.dataService.getRecord(webApi.customerInvoiceEmailDetail + '/' + customerInvoiceId)
        .subscribe((customerInvoiceResponses) => {
          const params = { cmd: customerInvoiceResponses, pdfUrl: pdfUrl, emailType: this.emailModelHeading };
          this.modalService.genericEmailModal(params).result.then();
        });
    });
  }
  print(customerInvoiceId: any, formattedInvoiceNumber: any) {
    this.dataService.getReport(webApi.PDFCustomerInvoice + '/' + customerInvoiceId).then((dataUrl: any) => {
      this.modalService.openPdfReportModal(this.modalHeadingReport + '-' + formattedInvoiceNumber, dataUrl);
    });
  }
  getData() {
    this.dataService.getLookupData(webApi.comapnyProfile, false).subscribe((data: any) => {
      this.companyProfile = data;
    })

    this.dataService.getLookupData(webApi.bankingDetailsForReference, true).subscribe((data: any) => {
      this.bankingDetails = data;
      if (this.hasAdditionalInfo()) {
        if (this.customerInvoiceId !== 0) {
          this.dataService
            .getRecord(webApi.getCustomerInvoice + '/' + this.customerInvoiceId)
            .subscribe((data: any) => {
              this.customerInvoice = data;
              this.disabled = data.isFinalised;
              this.init();
            });
        } else {
          this.init();
        }
      }
    })
    this.dataService.getLookupData(webApi.invoiceablecontactsFiltered, this.customerInvoiceId === 0).subscribe((data: any) => {
      this.customers = data;
      this.customers.unshift(this.newCustomer);
    })
    this.dataService.getLookupData(webApi.getCompanyProfileImage, false).subscribe((data: any) => {
      this.companyProfileImage = data
    })

    this.dataService.getLookupData(webApi.getVatInfoFilePath, true).subscribe((data: any) => {
      this.vatInfo = data;
      this.showVat = this.vatInfo.showVat;
      this.vatRate = this.vatInfo.vatRate;
      this.isVatRegistered = this.vatInfo.isVatRegistered;
    })

    this.dataService.getLookupData(webApi.invoiceOutItemTypes, true).subscribe((data: any) => {
      this.invoiceOutItemTypes = data
    })

    this.dataService.getLookupData(webApi.pricelist, true).subscribe((data: any) => {
      this.productlist = data;
    })

  }

  createdDateChanged() {
    const date = this.dateService.getMomentDate(this.customerInvoice.createdDate, 'DD/MM/YYYY');
    this.messagingService.broadcastVatDateChangedEvent(date);
    this.calculateSummary();
  }

  contactChange(customerInvoiceForm: any) {
    if (this.customerInvoice.contact.individualContact.id == "0") {
      //Code to add new contact here
      this.addNewContact(customerInvoiceForm);
    }
  }

  private hasAdditionalInfo() {
    if (this.bankingDetails == undefined || this.bankingDetails.length == 0) {
      return false;
    }
    return true;
  }

  calculateSummary() {
    const salesItemsTotal = Enumerable.from(this.customerInvoice.invoiceOutItems).where((c: any) => { return c.itemType === this.invoiceOutItemTypes.salesItem && c.isDeleted !== true; }).sum((c: any) => { return c.amount; });
    const discountItemsTotal = Enumerable.from(this.customerInvoice.invoiceOutItems).where((c: any) => { return c.itemType === this.invoiceOutItemTypes.discountItem && c.isDeleted !== true; }).sum((c: any) => { return c.amount; });
    const interestItemsTotal = Enumerable.from(this.customerInvoice.invoiceOutItems).where((c: any) => { return c.itemType === this.invoiceOutItemTypes.interestItem && c.isDeleted !== true; }).sum((c: any) => { return c.amount; });
    const salesItemVatTotal = Enumerable.from(this.customerInvoice.invoiceOutItems).where((c: any) => { return c.itemType === this.invoiceOutItemTypes.salesItem && c.isDeleted !== true; }).sum((c: any) => { return c.vat });
    const discountItemVatTotal = Enumerable.from(this.customerInvoice.invoiceOutItems).where((c: any) => { return c.itemType === this.invoiceOutItemTypes.discountItem && c.isDeleted !== true; }).sum((c: any) => { return c.vat });
    this.customerInvoice.subTotal = salesItemsTotal + interestItemsTotal;
    this.customerInvoice.totalDiscount = Math.abs(discountItemsTotal);
    this.customerInvoice.totalVat = salesItemVatTotal - Math.abs(discountItemVatTotal);
    this.customerInvoice.total = ((salesItemsTotal + salesItemVatTotal) + interestItemsTotal) - (Math.abs(discountItemsTotal) + Math.abs(discountItemVatTotal));
  }

  handleItemCreation(itemState: boolean){
    this.enableSaveButton = itemState;
  }

  onItemDeleted(item: any) {
    this.calculateSummary();
  }

  onItemSaved(item: any) {
    this.calculateSummary();
  }

  enableSaveButtonFn(args: any) {
    this.enableSaveButton = false;
  }

  editableItemOnEditModeEvent(args: any) {
    this.itemEditMode = args.editMode;
  }

  isDisabled() {
    return this.itemEditMode;
  }

  customerChange(customerInvoiceForm: any) {
    if (this.customerInvoice.contact.id == 0) {
      //Code to add new customer here
      this.addNewCustomer(customerInvoiceForm);
    } else {

      //Add a static option to add new contact
      const index = this.customerInvoice.contact.invoiceableIndividualContacts.map((x: any) => { return x.id; }).indexOf("0");
      if (index == -1) {
        this.customerInvoice.contact.invoiceableIndividualContacts.unshift(this.newContact);
      }

      if (this.customerInvoice.contact.invoiceableIndividualContacts.length > 1) {
        const individualContact: any = Enumerable.from(this.customerInvoice.contact.invoiceableIndividualContacts).elementAt(1);
        this.customerInvoice.contact.individualContact = individualContact;
        this.customerInvoice.contactId = this.customerInvoice.contact.id;
        this.customerInvoice.individualContactId = individualContact.id;
        this.messagingService.broadcastCheckFormValidatity();
      } else {
        this.addNewContact(customerInvoiceForm);
      }
    }
  }

  addNewCustomer(customerInvoiceForm: any) {

    this.modalService.addNewCustomerModal().result.then(
      (customerId: string) => {
        this.dataService.getLookupData(webApi.invoiceablecontactsFiltered, true)
          .subscribe((responses: any) => {
            this.customers = responses;

            //Add a static option to add new customer
            this.customers.unshift(this.newCustomer);

            const elementPos = this.customers.map((x: any) => { return x.id; }).indexOf(parseInt(customerId));
            this.customerInvoice.contact = this.customers[elementPos];

            this.customerChange(customerInvoiceForm);
          });
      })
      .catch((fallback: any) => {
        this.customerInvoice.contact = '';
      });
  }

  addNewContact(customerInvoiceForm: any) {

    const params = {
      orgId: this.customerInvoice.contact.id, orgCode: this.customerInvoice.contact.organisationCode
    };

    this.modalService.addNewContactModal(params).result.then(
      (individualContactId: string) => {
        this.dataService.getLookupData(webApi.invoiceablecontacts + '/' + this.customerInvoice.contact.id, true)
          .subscribe((data: any) => {
            this.customerInvoice.contact = data;

            //Add a static option to add new contact
            const index = this.customerInvoice.contact.invoiceableIndividualContacts.map(function (x: any) { return x.id; }).indexOf("0");
            if (index == -1) {
              this.customerInvoice.contact.invoiceableIndividualContacts.unshift(this.newContact);
            }

            const elementPos = this.customerInvoice.contact.invoiceableIndividualContacts.map(function (x: any) { return x.id; }).indexOf(parseInt(individualContactId));
            this.customerInvoice.contact.individualContact = this.customerInvoice.contact.invoiceableIndividualContacts[elementPos];

            this.customerInvoice.contactId = this.customerInvoice.contact.id;
            this.customerInvoice.individualContactId = individualContactId;

            customerInvoiceForm.individualContact.$setValidity('required', true);
            this.messagingService.broadcastCheckFormValidatity();
          });
      })
      .catch((fallback: any) => {
        if (this.customerInvoice.contact.invoiceableIndividualContacts.length > 1) {
          const individualContact: any = Enumerable.from(this.customerInvoice.contact.invoiceableIndividualContacts).elementAt(1);
          this.customerInvoice.contact.individualContact = individualContact;

          this.customerInvoice.contactId = this.customerInvoice.contact.id;
          this.customerInvoice.individualContactId = individualContact.id;
        }
      });
  }

  save(customerInvoice: any, form: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (form.valid) {
      this.enableSaveButton = true;

      let i = 1;
      const itemsOrderedByDisplayOrder = Enumerable.from(customerInvoice.invoiceOutItems).orderBy((c: any) => { return c.displayOrder; }).toArray();
      itemsOrderedByDisplayOrder.forEach((value: any, key: any) => {
        if (value.isDeleted !== true) {
          value.displayOrder = i;
          i++;
        }
      });

      customerInvoice.individualContactId = customerInvoice.contact.individualContact.id;
      customerInvoice.bankingDetailId = customerInvoice.bankingDetail.id;
      customerInvoice.createdDate = this.dateService.getFormattedDateForWebApi(customerInvoice.createdDate);
      this.dataService.post(webApi.saveCustomerInvoice, customerInvoice).subscribe((result: any) => {
        this.customerInvoiceId = result.value;
        customerInvoice.Id = this.customerInvoiceId;
        this.notificationBarService.success(this.saveSuccessMessage);
        this.invoicingDataService.clearCustomerInvoiceRouteCache();
        this.router.navigateByUrl('finance/invoicing/customerinvoices');
      });
    }
  }

  private init() {
    let bankDetail: any;

    if (this.customerInvoiceId !== 0) {
      const contact: any = Enumerable.from(this.customers).single((c: any) => { return c.id === this.customerInvoice.contactId; });
      this.customerInvoice.contact = contact;
      const individualContact = Enumerable.from(contact.invoiceableIndividualContacts).where((c: any) => { return c.id === this.customerInvoice.individualContactId; }).singleOrDefault();
      this.customerInvoice.contact.individualContact = individualContact;
      bankDetail = Enumerable.from(this.bankingDetails).where((c: any) => { return c.id === this.customerInvoice.bankingDetailsId; }).first();
    } else {
      this.customerInvoice.id = 0;
      this.customerInvoice.formattedInvoiceNumber = this.formattedInvoiceNumber;
      this.customerInvoice.createdDate = this.dateService.getTodaysDate();
      this.customerInvoice.contactId = {};
      this.customerInvoice.individualContactId = {};
      bankDetail = Enumerable.from(this.bankingDetails).where((c: any) => { return c.isPreferredBank === true; }).first();
      this.customerInvoice.bankingDetailId = bankDetail.id;
    }
    this.customerInvoice.bankingDetail = bankDetail;

  }

  private initTranslation() {
    
    this.translateService.get('resources.common-customerdropdown-addnewcustomer-msg').subscribe((msg: string) => {
      this.newCustomer.companyName = msg;
    });

    this.translateService.get('resources.common-contactdropdown-addnewcontact-msg').subscribe((msg: string) => {
      this.newContact.fullName = msg;
    });

    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: string) => {
      this.saveSuccessMessage = msg;
    });

    this.translateService.get('resources.finance-invoicing-customerinvoices-pdfinvoice').subscribe((msg: string) => {
      this.modalHeadingReport = msg;
    });

    this.translateService.get('resources.finance-invoicing-customerinvoices-addnew-invoicenoplaceholder').subscribe((msg: string) => {
      this.formattedInvoiceNumber = msg;
    });

    this.translateService.get('resources.reports-emailmodel-modelheading-emailtype-customerinvoice').subscribe((msg: string) => {
      this.emailModelHeading = msg;
    });
  }

  private ngAfterViewInit() {
    this.getData()
    this.initTranslation();
    this.messagingService.listenEditableItemOnEditModeEvent(this.editableItemOnEditModeEvent);
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButtonFn);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButtonFn);
  }
}
