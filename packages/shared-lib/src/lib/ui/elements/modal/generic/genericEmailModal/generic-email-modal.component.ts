import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "lib-generic-email-modal",
  templateUrl: "./generic-email-modal.component.html",
  styleUrls: ["./generic-email-modal.component.scss"],
})
export class GenericEmailModalComponent implements OnInit {
  @Input() params: any = {};
  toAddress = "";
  ccAddress = "";
  bccAddress = "";
  fromAddress = "";
  subject = "";
  body = "";
  url = "";
  emailType: any;
  cmd: any;
  emailTypeQuote = "";
  isPayslip = false;
  password = '';
  isEmailCopyToBeSent = false;
  isPasswordProtected = false;
  /*Web constants */
  emailName = webConstants.emailName;
  sendName = webConstants.sendName;
  cancelName = webConstants.cancelName;
  phrase = webConstants.phrase;
  closeData = webConstants.closeData;
  isLoading = false;
  constructor(
    public activeModal: NgbActiveModal,
    private messagingService: MessagingService,
    private dataService: DataService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    if (this.params) {
      this.toAddress = this.params.data.toEmailAddress ;
      this.ccAddress = this.params.data.ccEmailAddress;
      this.bccAddress = this.params.data.bccEmailAddress;
      this.fromAddress = this.params.data.fromEmailAddress ;
      this.subject = this.params.data.subject;
      this.body = this.params.data.body;
      this.url = this.params.pdfUrl;
      this.emailType = this.params.emailType;
      this.isPayslip = this.params.isPayslip;
      this.password = this.params.data.password;
      this.isPasswordProtected = this.password ? true : false;
      this.cmd = this.params.data;

    }
    this.getTranslation();
  }

  passBack(frm: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      let route = webApi.sendCustomerStatementEmailFilePath;
      if (this.emailType === this.emailTypeQuote) {
        route = webApi.SendQuoteEmail;
      } else if (this.isPayslip) {
        route = webApi.sendPayslipEmail;
      }
      const paramFilters = {
        id: this.params.data?.id,
        ToEmail: this.toAddress,
        CcEmail: this.ccAddress,
        BccEmail: this.bccAddress,
        FromEmail: this.fromAddress,
        Subject: this.subject,
        Body: this.body,
        isEmailCopyToBeSent: this.isEmailCopyToBeSent,
        isPasswordProtected: this.isPasswordProtected,
        Url: this.url.toString(),
      };
      this.isLoading = true;

      this.dataService.post(route, paramFilters).subscribe(
        (responses: any) => {
          this.collectNewEmailAddresses(responses);
          this.isLoading = false;

        },
        (fallback: any) => {
          this.isLoading = false;
        }

      )

    }
  }

  collectNewEmailAddresses(responses: any) {
    if (responses && responses.length > 0) {
      this.cmd.unSavedEmailAddress = [];
      for (let i = 0; i < responses.length; i++) {
        this.cmd.unSavedEmailAddress.push(responses[i]);
      }
    }
    this.activeModal.close(this.cmd);
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getTranslation() {
    this.translateService
      .get("resources.reports-emailmodel-modelheading-emailtype-quote")
      .subscribe((res: string) => {
        this.emailTypeQuote = res;
      });
  }
}
