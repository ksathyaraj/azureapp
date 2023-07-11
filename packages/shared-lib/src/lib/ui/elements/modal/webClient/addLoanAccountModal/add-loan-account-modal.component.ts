import { Component, EventEmitter, Input, Output } from "@angular/core";
import "@angular/compiler";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
    selector: "lib-add-owners-money-loan-account-modal",
    templateUrl: "./add-loan-account-modal.component.html",
    styleUrls: ["./add-loan-account-modal.component.css"],
})

export class AddLoanAccountModalComponent {
    @Input() public params: any = {};
    closeData = webConstants.closeData;
    constructor(
        public activeModal: NgbActiveModal,
        private dataService: DataService,
        private messagingService: MessagingService,
        private notificationBarService: NotificationBarService,
        private translateService: TranslateService,
    ) { }

    saveSuccessMessage = '';
    loanAccountName: any;

    getData() {
        this.init();
    }

    init() {
        if (this.params.loanAccountId != null) {
            this.loanAccountName = this.params.displayName;
        }
    }

    passBack(frm: any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (!frm.invalid) {
            this.dataService.post(webApi.addBusinessLoanAccount, { LoanAccountName: this.loanAccountName, LoanAccountId: this.params.loanAccountId, customLedgerAccountId: this.params.customLedgerAccountId }).subscribe(() => {
                this.notificationBarService.success(this.saveSuccessMessage);
                this.activeModal.close(this.loanAccountName);
            });
        }

    }

    closeModal() {
        this.activeModal.dismiss(this.closeData);
    }
    initTranslation() {
        this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
            this.saveSuccessMessage = msg;
        });
    }

    ngOnInit() {
        this.initTranslation();
        this.getData();
    }

}