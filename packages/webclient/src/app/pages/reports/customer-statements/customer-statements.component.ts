import { Component } from "@angular/core";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { TranslateService } from "@ngx-translate/core";
import { SpinnerService } from 'packages/shared-lib/src/lib/services/spinner.service';

@Component({
  selector: "web-customer-statements",
  templateUrl: "./customer-statements.component.html",
  styleUrls: ["./customer-statements.component.scss"],
})
export class CustomerStatementsComponent {
  constructor(private dataService: DataService,
    private messagingService: MessagingService,
    private dateService: DateService,
    private enumsService: EnumsService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private spinnerService : SpinnerService
    ) { }

  tabData: tabData[] = [
    { routerLink: '/reports/customerinvoicesdue', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesdue' },
    { routerLink: '/reports/customerinvoicesduebycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerinvoicesduebycustomer' },
    { routerLink: '/reports/customerageanalysis', header: 'resources.reports-customerageanalysis-tabheading-customerageanalysis' },
    { routerLink: '/reports/customerstatementbycustomer', header: 'resources.reports-customerageanalysis-tabheading-customerstatementbycustomer', isActive: true },
  ]

  ngOnInit() {
    this.activate();
    this.initTranslation();
  }
  customers: any = "";
  banks: any = "";
  fromDate: any = "";
  toDate: any = "";
  selectedBankDetailsId: any = "";
  selectedCustomerId: any = "";
  selectedCustomer: any = "";
  selectedContactId: any = "";
  notesInfo: any = "";
  modalHeading: any = "";
  blockQuoteData: any = "";

  activate() {
    this.getData();
  }

  getData() {
    this.dataService.getLookupData(webApi.getInvoiceableContacts, true).subscribe((result: any) => {
      this.customers = result;
    })

    this.dataService.getLookupData(webApi.getCustomerBankingDetails, true).subscribe((result: any) => {
      this.banks = result;
    })
  }

  fromDateRange(event: any) {
    this.fromDate = event;
  }
  toDateRange(event: any) {
    this.toDate = event;
  }
  changeBank(event: any) {
    this.selectedBankDetailsId = event;
  }
  changeCustomer(event: any) {
    this.selectedCustomer = this.customers.filter((data: any) => {
      return data.id === event
    })
    this.selectedCustomerId = event;
  }

  changeContact(event: any) {
    this.selectedContactId = event;
  }
  notes(event: any) {
    this.notesInfo = event;
  }

  email(frm: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      const pdfParams = {
        customerId: this.selectedCustomerId,
        contactId: this.selectedContactId,
        startDate: this.dateService.getFormattedDateForWebApi(this.fromDate),
        endDate: this.dateService.getFormattedDateForWebApi(this.toDate),
        bankDetailsId: this.selectedBankDetailsId,
        comments: this.notesInfo
      }
      this.dataService.getReportWithParams(webApi.getCustomerStatementByCustomerPdf, pdfParams).then((pdfUrl: any) => {
        this.dataService.getRecordWithParams(webApi.getCustomerStatementDetailsForEmail, { customerId: this.selectedContactId }).subscribe((emailResponses: any) => {
          const params = {
            data: emailResponses,
            pdfUrl: pdfUrl,
          };
          this.modalService.genericEmailModal(params).result.then((data: any) => {
            this.modalService.emailConfirmationModal(null).result.then((res: any) => {console.log("res")
            })
          });
        });
      });
    }
  }

  print(frm: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      this.translateService.get('resources.reports-customerinvoicesduebycustomer-pdfmodal-header-customerinvoicesdue-customerstatementreport').subscribe((msg: string) => {
        this.modalHeading = msg;
        const params = {
          customerId: this.selectedCustomerId,
          contactId: this.selectedContactId,
          startDate: this.dateService.getFormattedDateForWebApi(this.fromDate),
          endDate: this.dateService.getFormattedDateForWebApi(this.toDate),
          bankDetailsId: this.selectedBankDetailsId,
          comments: this.notesInfo
        }
        this.dataService.getReportWithParams(webApi.getCustomerStatementByCustomerPdf, params).then((dataUrl: any) => {
          this.modalService.openPdfReportModal(this.modalHeading, dataUrl);

        })
      });
    }
  }

  initTranslation() {
    this.translateService.get('resources.reports-customerstatementbycustomer-paragraph-blockquote').subscribe((msg: any) => {
      this.blockQuoteData = msg;
    });
  }

}
