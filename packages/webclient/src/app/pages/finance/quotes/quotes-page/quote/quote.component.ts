import { Component } from "@angular/core";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { InvoicingDataService } from "packages/shared-lib/src/lib/services/invoicing-data.service"
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { TranslateService } from '@ngx-translate/core';
import Enumerable from 'linq'
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "web-quote",
    templateUrl: "./quote.component.html",
    styleUrls: ["./quote.component.css"],
})
export class QuoteComponent {
    bankingDetails: any;
    customers: any;
    vatInfo: any;
    isVatRegistered: any;
    vatRate: any;
    itemEditMode: any;
    companyProfileImage: any;

    constructor(
        private invoicingDataService: InvoicingDataService,
        private lookupDataService: LookupDataService,
        private dateService: DateService,
        private messagingService: MessagingService,
        private modalService: ModalService,
        private navigationService: NavigationService,
        private notificationBarService: NotificationBarService,
        private translateService: TranslateService,
        private dataService: DataService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.quoteId = parseInt(params['id']);
        });
    }

    quote: any = {
        quoteItems: [],
        contact: '',
        projectId: '',
        totalDiscount: 0,
        totalVat: 0,
        total: 0,
        subTotal: 0
    };
    productlist = [];
    quoteItemTypes: any = [];
    quoteId = 0;
    showVat = false;
    enableSaveButton = false;
    // bn = ExternalPartyLibraryService.bn;
    private saveSuccessMessage = '';
    private msg1 = '';
    private msg2 = '';
    private title = '';
    private confirmDeleteMessage = '';
    private modalHeadingCustomer = '';
    private customerMessage = '';
    private customerMessageRedirect = '';
    private modalHeadingBankAccount = '';
    private bankAccountMessage = '';
    private bankAccountMessageRedirect = '';
    private modalHeadingReport = '';
    private notSaveInfo = '';
    private emailModelHeading = '';
    companyProfile: any = { companyDisplayName: '', }
    //Datepicker
    openedStart = false;
    openedEnd = false;
    dateOptions = {
        'show-weeks': false
    };
    emailQuote(quoteId: any) {


        this.dataService.getReport(webApi.PDFQuote + '/' + quoteId).then((pdfUrl) => {
            this.dataService.getRecord(webApi.quoteEmailDetail + '/' + quoteId)
                .subscribe((quoteResponses:any) => {
                    const quoteResponseData: any = { ...quoteResponses }
                    quoteResponseData['fromEmailAddress'] = quoteResponses.fromEmail;
                    quoteResponseData['toEmailAddress'] = quoteResponses.toEmail;
                    quoteResponseData['subject'] = quoteResponses.quoteSubject;
                    quoteResponseData['body'] = quoteResponses.quoteBody;

                    const params = {
                        data: quoteResponseData,
                        pdfUrl: pdfUrl,
                        emailType: this.emailModelHeading
                    };
                    this.modalService.genericEmailModal(params).result.then(
                        (data: any) => {
                            const params={
                                contactId:data.contactId,
                                unSavedEmailAddress:data.unSavedEmailAddress
                            }
                            this.modalService.emailConfirmationModal(params);
                        });
                });

        });
    }
    newCustomer = { id: "0", companyName: "Add New Customer" };
    newContact = { id: "0", fullName: "Add New Contact" };

    getData() {
        this.dataService.getLookupData(webApi.comapnyProfile, false).subscribe((data: any) => {
            this.companyProfile = data;
        })

        this.dataService.getLookupData(webApi.bankingDetailsForReference, true).subscribe((data: any) => {
            this.bankingDetails = data;
            if (this.hasAdditionalInfo()) {
                if (this.quoteId !== 0) {
                    this.dataService.getRecord(webApi.quotes + '/' + this.quoteId.toString()).subscribe((quoteResponses: any) => {
                        this.quote = quoteResponses;
                        this.quote.projectId = ""
                        this.init();
                    })
                } else {
                    this.init();
                }
            }
        })

        this.dataService.getLookupData(webApi.invoiceablecontactsFiltered, this.quoteId === 0).subscribe((data: any) => {
            this.customers = data;
            this.customers.unshift(this.newCustomer);
        })

        this.dataService.getLookupData(webApi.pricelist, true).subscribe((data: any) => {
            this.productlist = data;
        })

        this.dataService.getLookupData(webApi.quoteItemTypes, true).subscribe((data: any) => {
            this.quoteItemTypes = data
        })

        this.dataService.getLookupData(webApi.getVatInfoFilePath, true).subscribe((data: any) => {
            this.vatInfo = data;
            this.showVat = this.vatInfo.showVat;
            this.vatRate = this.vatInfo.vatRate;
            this.isVatRegistered = this.vatInfo.isVatRegistered;
        })

        this.dataService.getLookupData(webApi.getCompanyProfileImage, false).subscribe((data: any) => {
            this.companyProfileImage = data
        })
    }

    createdDateChanged() {
        const date = this.dateService.getMomentDate(this.quote.createdDate, 'DD/MM/YYYY');
        this.messagingService.broadcastVatDateChangedEvent(date);
        this.calculateSummary();
    }

    private checkStartingDetails(companyProfile: any) {
        if (companyProfile.quoteStartingDetailSet === false) {
            //bring up quote starting details modal
            // this.modalService.genericStartingDetailsModal(companyProfile.quotePrefix, companyProfile.quoteNumber || 1).result.then((result: any) => {
            //     //save quote starting details here
            //     this.invoicingDataService.saveQuoteStartingDetails(result).subscribe(() => {
            //         //refresh company profile cache
            //         this.lookupDataService.getCompanyProfile(true,false);
            //     });
            // });
        }
    }

    private hasAdditionalInfo() {
        if (this.bankingDetails == undefined || this.bankingDetails.length == 0) {

            // this.modalService.messageModal(this.modalHeadingBankAccount, this.bankAccountMessage + ", " + this.bankAccountMessageRedirect + ".").result.then(
            // () => {
            //     this.navigationService.goToAddNewBankAccount();
            // });
            return false;
        }
        return true;
    }

    customerChangeOld() {

        if (this.quote.contact.invoiceableIndividualContacts.length > 0) {
            const individualContact: any = Enumerable.from(this.quote.contact.invoiceableIndividualContacts).firstOrDefault();
            this.quote.contact.individualContact = individualContact;

            this.quote.contactId = this.quote.contact.id;
            this.quote.individualContactId = individualContact.id;
        } else {

            const message = this.msg1 + ' ' + this.quote.contact.companyName + '.' + this.msg2 + '?';
            // this.modalService.questionModal(this.title, message).result.then(
            // () => {
            //     $location.path('/contacts/organisations/' + this.quote.contact.id + '/contacts/0');
            // },
            // ()=>{
            //     this.quote.contact = "";
            // });
        }
    }

    customerChange(quoteForm: any) {
        if (this.quote.contact.id == 0) {
            //Code to add new customer here
            this.addNewCustomer(quoteForm);
        } else {

            //Add a static option to add new contact
            const index = this.quote.contact.invoiceableIndividualContacts.map((x: any) => { return x.id; }).indexOf("0");
            if (index == -1) {
                this.quote.contact.invoiceableIndividualContacts.unshift(this.newContact);
            }

            if (this.quote.contact.invoiceableIndividualContacts.length > 1) {
                const individualContact: any = Enumerable.from(this.quote.contact.invoiceableIndividualContacts).elementAt(1);
                this.quote.contact.individualContact = individualContact;
                this.quote.contactId = this.quote.contact.id;
                this.quote.individualContactId = individualContact.id;

                // quoteForm.individualContact.$setValidity('required', true);
                this.messagingService.broadcastCheckFormValidatity();
            } else {
                this.addNewContact(quoteForm);
            }
        }
    }

    contactChange(quoteForm: any) {
        if (this.quote.contact.individualContact.id == "0") {
            //Code to add new contact here
            this.addNewContact(quoteForm);
        }
    }

    addNewCustomer(quoteForm: any) {

        this.modalService.addNewCustomerModal().result.then(
            (customerId: string) => {
                this.dataService.getLookupData(webApi.invoiceablecontactsFiltered, true)
                    .subscribe((responses: any) => {
                        this.customers = responses;

                        //Add a static option to add new customer
                        this.customers.unshift(this.newCustomer);

                        const elementPos = this.customers.map((x: any) => { return x.id; }).indexOf(parseInt(customerId));
                        this.quote.contact = this.customers[elementPos];

                        this.customerChange(quoteForm);
                    });
            })
            .catch((fallback: any) => {
                this.quote.contact = '';
            });
    }

    addNewContact(quoteForm: any) {

        const params = {
            orgId: this.quote.contact.id, orgCode: this.quote.contact.organisationCode
        };

        this.modalService.addNewContactModal(params).result.then(
            (individualContactId: string) => {
                //refresh the selected customer
                // this.lookupDataService.getInvoiceableContact(this.quote.contact.id, true)
                this.dataService.getLookupData(webApi.invoiceablecontacts + '/' + this.quote.contact.id, true)
                    .subscribe((data: any) => {
                        this.quote.contact = data;

                        //Add a static option to add new contact
                        const index = this.quote.contact.invoiceableIndividualContacts.map(function (x: any) { return x.id; }).indexOf("0");
                        if (index == -1) {
                            this.quote.contact.invoiceableIndividualContacts.unshift(this.newContact);
                        }

                        const elementPos = this.quote.contact.invoiceableIndividualContacts.map(function (x: any) { return x.id; }).indexOf(parseInt(individualContactId));
                        this.quote.contact.individualContact = this.quote.contact.invoiceableIndividualContacts[elementPos];

                        this.quote.contactId = this.quote.contact.id;
                        this.quote.individualContactId = individualContactId;

                        quoteForm.individualContact.$setValidity('required', true);
                        this.messagingService.broadcastCheckFormValidatity();
                    });
            })
            .catch((fallback: any) => {
                if (this.quote.contact.invoiceableIndividualContacts.length > 1) {
                    const individualContact: any = Enumerable.from(this.quote.contact.invoiceableIndividualContacts).elementAt(1);
                    this.quote.contact.individualContact = individualContact;

                    this.quote.contactId = this.quote.contact.id;
                    this.quote.individualContactId = individualContact.id;
                }
            });
    }

    save(quote: any, form: any) {
        this.messagingService.broadcastCheckFormValidatity();

        if (form.valid) {
            this.enableSaveButton = true;

            let i = 1;
            const itemsOrderedByDisplayOrder = Enumerable.from(quote.quoteItems).orderBy((c: any) => { return c.displayOrder; }).toArray();
            itemsOrderedByDisplayOrder.forEach((value: any, key: any) => {
                if (value.isDeleted !== true) {
                    value.displayOrder = i;
                    i++;
                }
            });

            quote.individualContactId = quote.contact.individualContact.id;
            quote.bankingDetailId = quote.bankingDetail.id;
            quote.createdDate = this.dateService.getFormattedDateForWebApi(quote.createdDate);
            this.dataService.post(webApi.quoteSave, quote).subscribe((result: any) => {
                this.quoteId = result.value;
                quote.Id = this.quoteId;
                this.notificationBarService.success(this.saveSuccessMessage);
                this.invoicingDataService.clearQuotesRouteCache();
                this.navigationService.goToQuotes();
            });
        }
    }

    calculateSummary() {
        const salesItemsTotal = Enumerable.from(this.quote.quoteItems).where((c: any) => { return c.itemType === this.quoteItemTypes.salesItem && c.isDeleted !== true; }).sum((c: any) => { return c.amount; });
        const discountItemsTotal = Enumerable.from(this.quote.quoteItems).where((c: any) => { return c.itemType === this.quoteItemTypes.discountItem && c.isDeleted !== true; }).sum((c: any) => { return c.amount; });
        const salesItemVatTotal = Enumerable.from(this.quote.quoteItems).where((c: any) => { return c.itemType === this.quoteItemTypes.salesItem && c.isDeleted !== true; }).sum((c: any) => { return c.vat });
        const discountItemVatTotal = Enumerable.from(this.quote.quoteItems).where((c: any) => { return c.itemType === this.quoteItemTypes.discountItem && c.isDeleted !== true; }).sum((c: any) => { return c.vat });
        // const salesItemVatTotal = Enumerable.from(this.quote.quoteItems).where( (c: any) => { return c.itemType === this.quoteItemTypes.salesItem && c.isDeleted !== true; }).sum( (c: any) => { return new bn(c.vat).round(2).toNumber(); });
        // const discountItemVatTotal = Enumerable.from(this.quote.quoteItems).where( (c: any) => { return c.itemType === this.quoteItemTypes.discountItem && c.isDeleted !== true; }).sum( (c: any) => { return new bn(c.vat).round(2).toNumber(); });

        this.quote.subTotal = salesItemsTotal;
        this.quote.totalDiscount = Math.abs(discountItemsTotal);
        this.quote.totalVat = salesItemVatTotal - Math.abs(discountItemVatTotal);
        this.quote.total = (salesItemsTotal + salesItemVatTotal) - (Math.abs(discountItemsTotal) + Math.abs(discountItemVatTotal));
    }

    print(quoteId: any) {
        this.dataService.getReport(webApi.PDFQuote + '/' + quoteId).then((dataUrl: any) => {
            this.modalService.openPdfReportModal(this.modalHeadingReport, dataUrl);
        });
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

    private init() {
        let bankDetail: any;

        if (this.quoteId !== 0) {
            const contact: any = Enumerable.from(this.customers).single((c: any) => { return c.id === this.quote.contactId; });
            this.quote.contact = contact;
            const individualContact = Enumerable.from(contact.invoiceableIndividualContacts).where((c: any) => { return c.id === this.quote.individualContactId; }).singleOrDefault();
            this.quote.contact.individualContact = individualContact;
            bankDetail = Enumerable.from(this.bankingDetails).where((c: any) => { return c.id === this.quote.bankingDetailId; }).first();
        } else {
            this.quote.id = 0;
            this.quote.formattedQuoteNumber = this.notSaveInfo;
            this.quote.createdDate = this.dateService.getTodaysDate();
            this.quote.contactId = {};
            this.quote.individualContactId = {};
            bankDetail = Enumerable.from(this.bankingDetails).where((c: any) => { return c.isPreferredBank === true; }).first();
            this.quote.bankingDetailId = bankDetail.id;
        }
        this.quote.bankingDetail = bankDetail;

        this.checkStartingDetails(this.companyProfile);

    }

    handleItemCreation(itemState: boolean){
        this.enableSaveButton = itemState;
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

        this.translateService.get('resources.finance-quotes-quotes-nocontactsmessage1').subscribe((msg: string) => {
            this.msg1 = msg;
        });

        this.translateService.get('resources.finance-quotes-quotes-nocontactsmessage2').subscribe((msg: string) => {
            this.msg2 = msg;
        });

        this.translateService.get('resources.finance-quotes-quotes-deleteconfirmmessage').subscribe((msg: string) => {
            this.confirmDeleteMessage = msg;
        });

        this.translateService.get('resources.finance-quotes-controller-title-nocontacts').subscribe((msg: string) => {
            this.title = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-heading-addcustomer').subscribe((msg: string) => {
            this.modalHeadingCustomer = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-addcustomer-showmessage').subscribe((msg: string) => {
            this.customerMessage = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-addcustomer-showmessageredirect').subscribe((msg: string) => {
            this.customerMessageRedirect = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-heading-addbankaccount').subscribe((msg: string) => {
            this.modalHeadingBankAccount = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-addbankaccount-showmessagebankaccount').subscribe((msg: string) => {
            this.bankAccountMessage = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-addbankaccount-showmessage').subscribe((msg: string) => {
            this.bankAccountMessageRedirect = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-pdfmodal-header-quotereport').subscribe((msg: string) => {
            this.modalHeadingReport = msg;
        });

        this.translateService.get('resources.finance-quotes-quote-notsavemessage').subscribe((msg: string) => {
            this.notSaveInfo = msg;
        });

        this.translateService.get('resources.reports-emailmodel-modelheading-emailtype-quote').subscribe((msg: string) => {
            this.emailModelHeading = msg;
        });
    }

    private ngAfterViewInit() {
        this.initTranslation();

        this.getData();

        this.messagingService.listenEditableItemOnEditModeEvent(this.editableItemOnEditModeEvent);

        this.messagingService.listenGlobalErrorEvent(this.enableSaveButtonFn);
        this.messagingService.listenGlobalWarningEvent(this.enableSaveButtonFn);
    }
}
