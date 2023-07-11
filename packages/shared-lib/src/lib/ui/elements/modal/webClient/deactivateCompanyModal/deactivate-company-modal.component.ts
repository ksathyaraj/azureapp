import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DeActivateSessionService } from "packages/shared-lib/src/lib/services/de-activate-session.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-deactivate-company-modal",
  templateUrl: "./deactivate-company-modal.component.html",
  styleUrls: ["./deactivate-company-modal.component.scss"],
})
export class DeactivateCompanyModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private deActivateSessionService:DeActivateSessionService
  ) {}

  options=[
    {value:"Never logged in",display:"Never logged in"},
    {value:"System not used since sign up",display:"System not used since sign up"},
    {value:"Unpaid Debit Order",display:"Unpaid Debit Order"},
    {value:"EFT not renewed",display:"EFT not renewed"},
    {value:"Credit Card not renewed",display:"Credit Card not renewed"},
    {value:"Not required at present",display:"Not required at present"},
    {value:"Unable to contact",display:"Unable to contact"},
    {value:"Duplicate sign up",display:"Duplicate sign up"},
    {value:"Notice given",display:"Notice given"},
    {value:"Free Trial ended and did not sign up",display:"Free Trial ended and did not sign up"},
    {value:"Need other features",display:"Need other features"},
    {value:"Will remain with Pastel, Quickbooks, Excel",display:"Will remain with Pastel, Quickbooks, Excel"},
    {value:"No Internet access/poor connection",display:"No Internet access/poor connection"},
    {value:"Voucher, PLP, Xcelerate",display:"Voucher, PLP, Xcelerate"},
    {value:"Unaffordable",display:"Unaffordable"},
    {value:"Outside of SA",display:"Outside of SA"},
    {value:"",display:"Other"}
  ]

  params:any
  deactivationReason=''
  comment=''

  cancel() {
      this.activeModal.close()
  }

  deactivationReasonChanged() {
      this.comment = this.deactivationReason;
  }

  ok(frm:any) {
    // MessagingService.broadcastCheckFormValidatity();
    if (frm.valid) {

        const deActivationData = {
            deactivationReason: this.deactivationReason,
            comment: this.comment
        };

        this.deActivateSessionService.create(deActivationData);
        this.dataService.post(webPortal.subscriptionsuspend + this.params.company.id + '/' + this.params.subscriptionId + '?reason=' + this.comment).subscribe(() => {
            // this.dataService.invalidateRouteCache(newRegistrationsRoute);
            // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
            // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
            // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
            // this.dataService.invalidateRouteCache(allCompaniesRoute);
            // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
            // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
            // this.dataService.invalidateRouteCache(usageReportRoute);
            this.activeModal.close()
        });
    }
}

ngOnInit() {
    this.deActivateSessionService.load();
    if (this.deActivateSessionService.deActivationData) {
        this.deactivationReason = this.deActivateSessionService.deActivationData.deactivationReason;
        this.comment = this.deActivateSessionService.deActivationData.comment;
    }
}
}
