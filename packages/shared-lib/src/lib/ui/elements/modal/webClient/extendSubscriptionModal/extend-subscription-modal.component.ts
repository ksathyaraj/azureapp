import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-extend-subscription-modal",
  templateUrl: "./extend-subscription-modal.component.html",
  styleUrls: ["./extend-subscription-modal.component.scss"],
})
export class ExtendSubscriptionModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService
  ) {

    for(let i=1;i<=30;i++)
    {
      this.options.push({value:i,display:i})
    }

  }

  options:any=[]

  params:any
  reason:any
  daysToExtendBy:any

  cancel() {
      this.activeModal.close()
  }

  ok(frm:any) {
    // MessagingService.broadcastCheckFormValidatity();
    if (frm.valid) {

        const data = {
            reason: this.reason,
            subscriptionId: this.params.subscriptionId,
            daysToExtendExpiryBy: this.daysToExtendBy
        };
        this.dataService.post(webPortal.subscriptionextend, data).subscribe(() => {
          // this.dataService.invalidateRouteCache(newRegistrationsRoute);
          // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
          // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
          // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
          // this.dataService.invalidateRouteCache(allCompaniesRoute);
          // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
          // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
          // this.dataService.invalidateRouteCache(usageReportRoute);
            this.activeModal.close()
            this.notificationBarService.success('Subscription Expiry Extended.');
        });
    }
}

}
