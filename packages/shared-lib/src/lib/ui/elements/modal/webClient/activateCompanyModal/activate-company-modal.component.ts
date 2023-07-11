import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivateSessionService } from "packages/shared-lib/src/lib/services/activate-session.service";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-activate-company-modal",
  templateUrl: "./activate-company-modal.component.html",
  styleUrls: ["./activate-company-modal.component.scss"],
})
export class ActivateCompanyModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private activateSessionService : ActivateSessionService
  ) {}

  options=[
    {value:"Payment received",display:"Payment received"},
    {value:"Free Trial extended",display:"Free Trial extended"},
    {value:"User discontinued then came back",display:"User discontinued then came back"},
    {value:"Payment received",display:"Payment received"},
    {value:"Deactivated in error",display:"Deactivated in error"},
    {value:"",display:"Other"}
  ]

  params:any
  activationReason:any
  comment:any

  cancel() {
    this.activeModal.close()
  }

  activationReasonChanged() {
      this.comment = this.activationReason;
  }


  ok(frm:any) {
      // MessagingService.broadcastCheckFormValidatity();
      if (frm.valid) {
          const activationData = {
              activationReason: this.activationReason,
              comment: this.comment
          };

          this.activateSessionService.create(activationData);
          this.dataService.post(webPortal.subscriptionactivate + this.params.company.id + '/' + this.params.subscriptionId + '?reason=' + this.comment).subscribe(() => {
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

  ngOnIntit() {
      this.activateSessionService.load();

      if (this.activateSessionService.activationData) {
          this.activationReason = this.activateSessionService.activationData.activationReason;
          this.comment = this.activateSessionService.activationData.comment;
      }
}

}
